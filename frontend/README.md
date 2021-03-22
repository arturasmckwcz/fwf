# FWF Frontend

React/Redux stack is used.

Basicaly provides forms for data input according to forkflow
Has 3 major sections:
~ menu bar on top
~ forms on left side
~ lists on right side

Before the main screen there will be the modal login form

## Menu

Menu bar has 2 sections:
~ 3 major shorcuts
~ remaining menu items

### Shortcuts

There are two major actors:
~ administrator, who receives orders for production, the shortcuts are:
'New Prescription', 'New Source (material)' and 'New Patient'
~ lab biologist, who does a production, the shortcuts are:
'New production', 'Store doses' and 'Dispatch a dose'

### Remaining menu

Remaining menu items provide CRUD functionality per each entity

## Forms

Forms are dynamicaly displayed according to shortcut or regular menu selection
There might be a need to display a number of forms

## Lists

In case a search form is displayed and filled in after submition a list of seach results will be displayed.
Each record will be clickable and prepopulate a form for CRUD or submition according to the workflow.
