def clean_username(username):
    """
    Clean and normalize the username.
    Remove any special characters and spaces.
    """
    # Convert to lowercase and replace spaces with underscores
    username = username.lower().replace(' ', '_')
    
    # Remove any special characters except underscores
    username = ''.join(c for c in username if c.isalnum() or c == '_')
    
    return username 