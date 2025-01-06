export default function extractErrorMessage(error: unknown): string | null {
	// Handle HTML responses (like 502 Bad Gateway)
	if (typeof error === "object" && error !== null && "data" in error) {
		const errorData = (error as { data: any }).data;

		// If the error is HTML (like 502 Bad Gateway)
		if (typeof errorData === "string" && errorData.includes("<!DOCTYPE html>")) {
			return "Server error. Please try again later.";
		}

		// Handle regular error responses
		if (typeof errorData === "object" && errorData !== null) {
			if ("detail" in errorData && typeof errorData.detail === "string") {
				return errorData.detail;
			}

			const messages: string[] = [];

			Object.keys(errorData).forEach((key) => {
				if (key !== "status_code") {
					const fieldError = errorData[key];
					if (Array.isArray(fieldError)) {
						messages.push(...fieldError);
					} else if (typeof fieldError === "object" && fieldError !== null) {
						Object.values(fieldError).forEach((errorMessages: any) => {
							if (Array.isArray(errorMessages)) {
								messages.push(...errorMessages);
							}
						});
					}
				}
			});
			return messages.length > 0 ? messages.join(", ") : null;
		}

		// If errorData is a string
		if (typeof errorData === "string") {
			return errorData;
		}
	}

	// Handle other types of errors
	if (error instanceof Error) {
		return error.message;
	}

	return "An unexpected error occurred";
}