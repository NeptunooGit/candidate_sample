export const defaultNavOrderTabIndex = 0
export const programmaticFocusTabIndex = -1

export const tabIndex = allowTabNavigation =>
  allowTabNavigation
    ? defaultNavOrderTabIndex
    : programmaticFocusTabIndex
