# ==========================================================================================================================
# COLOUR DEFINITIONS

_COLOUR_RED=\033[0;31m
_COLOUR_GREEN=\033[0;32m
_COLOUR_ORANGE=\033[0;33m
_COLOUR_BLUE:=\033[0;34m
_COLOUR_END=\033[0m
_TIMESTAMP = [$(shell date +"%H:%M:%S")]

# ==========================================================================================================================

# You can use any of the following functions like so:
#
#   @$(call SUCCESS, This is a success message!)

INFO = echo -e "$(_TIMESTAMP) - [$(_COLOUR_BLUE)INFO$(_COLOUR_END)]\t$(_COLOUR_BLUE)$(1)$(_COLOUR_END)"
SUCCESS = echo -e "$(_TIMESTAMP) - [$(_COLOUR_GREEN)SUCCESS$(_COLOUR_END)]\t$(_COLOUR_GREEN)$(1)$(_COLOUR_END)"
WARNING = echo -e "$(_TIMESTAMP) - [$(_COLOUR_ORANGE)WARNING$(_COLOUR_END)]\t$(_COLOUR_ORANGE)$(1)$(_COLOUR_END)"
ERROR = echo -e "$(_TIMESTAMP) - [$(_COLOUR_RED)ERROR$(_COLOUR_END)]\t$(_COLOUR_RED)$(1)$(_COLOUR_END)"

# ==========================================================================================================================
