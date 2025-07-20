# Configuration Guide

## Setting Default Color Mode

You can change the default color mode of your portfolio by editing the `.config` file in the root directory.

### Usage

1. Open the `.config` file
2. Change the `DEFAULT_THEME` value:
   ```
   DEFAULT_THEME=dark    # For dark mode (default)
   DEFAULT_THEME=light   # For light mode
   ```
3. Save the file
4. Refresh your browser to see the changes

### Example `.config` file:
```
# Portfolio Configuration
# Set the default color mode for the site
# Options: light, dark
DEFAULT_THEME=dark
```

### Notes:
- The setting only affects the **initial/default** theme when someone first visits your site
- Users can still toggle between themes using the robot head
- Comments (lines starting with #) are ignored
- Invalid values will fallback to dark mode
