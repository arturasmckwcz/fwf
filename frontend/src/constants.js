const color = {
  h: '200',
  s: '70%',
}

export const styling = {
  color: {
    background: `hsl(${color.h}, ${color.s}, 20%)`,
    text: `hsl(${color.h}, ${color.s}, 80%)`,
    text_dimmed: `hsl(${color.h}, ${color.s}, 40%)`,
    hover: `hsl(${color.h}, ${color.s}, 10%)`,
    border: `hsl(${color.h}, ${color.s}, 40%)`,
    border_dimmed: `hsl(${color.h}, ${color.s}, 30%)`,
    shadow_lighter: `hsl(${color.h}, ${color.s}, 30%)`,
    shadow_darker: `hsl(${color.h}, ${color.s}, 20%)`,
    button_normal: `hsl(${color.h}, ${color.s}, 50%)`,
    button_mutate: 'green',
    button_delete: 'red',
  },
  shadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  menu_height: '50px',
  margin_left: '20px',
  padding_left: '10px',
  padding_right: '10px',
  margin_top_container: '57px',
  margin_bottom: '5px',
  input_height: '25px',
}

export const menus = {
  MENU_NULL: 'MENU_NULL',
  MENU_NEW_PATIENT: 'MENU_NEW_PATIENT',
  MENU_NEW_PRESCRIPTION: 'MENU_NEW_PRESCRIPTION',
  MENU_NEW_SOURCE: 'MENU_NEW_SOURCE',
  MENU_NEW_PRODUCTION: 'MENU_NEW_PRODUCTION',
}

export const forms = {
  FORM_PERSON_FULL: 'FORM_PERSON',
  FORM_PATIENT: 'FORM_PATIENT',
}

export const lists = {
  LIST_PERSON: 'LIST_PERSON',
  LIST_DOCTOR: 'LIST_DOCTOR',
}

export const inputTimeout = 500

export const genders = ['male', 'female', 'undefined']

export const statuses = ['O', 'X']

export const urlAPI = process.env.REACT_APP_API_URL
