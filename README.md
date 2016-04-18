# knobjs

A component library for knockout.js to build skinnable UIs with ease.

Knobjs is a component library based on knockoutjs. The main goal of the lib is to ease the way of creating skinnable / themed UIs. The components communicate through ko.observables. Other than knockout, its dependency is [superdata](https://github.com/EDMdesigner/superdata) which is a general data layer which can be used with any client-side frameworks.


## knob-button

This is one of the most basic components in knobjs. It works like you would expect it from a button. If you click on it, something will be triggered. This is why most of the components in knobjs are using this element. Each components where some kind of changes should be triggered by a click are implemented with knob-buttons.

### Params

Param     | Type     | Required     | Default value | Description
---       |---       |---           |---            |---
variation | string   | No           | "default"     | The variation of the button. See the [style](#styling-knob-components) section.
label     | string   | Partially ** |               | The text which will be written on the button.
iconLeft  | string   | Partially ** |               | The id of the icon on the left of the label.
iconRight | string   | Partially ** |               | The id of the icon on the right of the label
icon      | string   | Partially ** |               | This is a synonim for iconLeft.
click     | function | No           |               | This is the callback which will be called on click.

** At least one of these params has to be given, otherwise an error will be thrown. It's because you probably don't want to create a totally empty button.


### Example

```html
<knob-button class="button--sm" params="
	label: 'Search',
	variation: 'primary',
	icon: '#icon-search',
	click: clickCallback">
</knob-button>

<script>
	ko.applyBindings({
		clickCallback: function() {
			alert("search clicked")
		}
	});
</script>
```

## knob-input

This is the other most basic component in knobjs. It's just a simple imput, but you can style it in the [knob way](#styling-knob-components).

### Params

Param     | Type                    | Required | Default value         | Description
---       |---                      |---       |---                    |---
variation | string                  | No       | "default"             | The variation of the button. See the [style](#styling-knob-components) section.
type      | string                  | No       | "text"                | The type of the input. (Eg.: 'password')
value     | ko.observable           | Yes      |                       | This is the observable in which the value will be written. If you want to use the value of the input, then you must give it as a parameter.
hasFocus  | ko.observable (boolean) | No       | ko.observable (false) | With this observable, you can programmatically set the focus to this input.


### Example
```html
<knob-input params="
	type: 'password',
	value: value">
</knob-input>

<script>
	ko.applyBindings({
		value: ko.observable("")
	});
</script>
```

## knob-radio

This component is built on top of the knob-button component and it implements a radio button behaviour. This means that you can select one of it's elements and only one element can be selected from the group. Since it is composed from knob-button elements, you can add icons and labels to it's elements.

### Params

Param       | Type                   | Required | Default value | Description
---         |---                     |---       |---            |---
group       | string                 | Yes      |               | This value will indicate in which group the buttons will be. You can connect multiple knob-radios by putting them into the same group.
selected    | ko.observable          | No       |               | The selected element will be put into this observable.
selectedIdx | ko.observable (number) | No       |               | The selected index will be written into this observable. Also, you can set the default selection by giving a value to this observable.
items       | Array                  | Yes      |               | You can configure the buttons within the component, so every parameter which you can pass to buttons are valid in this array. Also, there is an extra value parameter.

### Example
```html
<knob-radio class="knob-radio--inline" params="
	group: 'test',
	selected: selectedElement,
	selectedIdx: selectedIndex,
	items: [
		{icon: '#icon-grid', value: {field: 'id desc', asc: true}},
		{icon: '#icon-list', value: {field: 'id', asc: false}},
		{label: 'Third option', value: {field: 'name', asc: true}}
	]">
</knob-radio>

<script>
	ko.applyBindings({
		selectedElement: ko.observable(),
		selectedIndex: ko.observable(1)
	});
</script>
```

## knob-dropdown

This component is also composed of knob-buttons. Therefore very element can have it's icon and label. It also can have an icon on the right, which is usually a caret pointing down to indicate the options will be visible if you click on it. In a sense, it's very similar to the knob-radio element.

### Params

Param     | Type          | Required | Default value | Description
---       |---            |---       |---            |---
selected  | ko.observable | Yes      |               | The selected element. This is not visible in the dropdown list.
rightIcon | string        | No       |               | The icon on the right of the selected element. Should be a caret to indicate that something will appear on the bottom if you click on it.
items     | Array         | Yes      |               | The items in the dropdown. They are configured just like buttons and they also can have a value property.

### Example
```html
<knob-dropdown params="
	selected: selectedElement,
	rightIcon: '#icon-down',
	items: [
		{label: 'id', icon: '#icon-a-z', value: {field: 'id desc', asc: true}},
		{label: 'id', icon: '#icon-z-a', value: {field: 'id', asc: false}},
		{label: 'name', icon: '#icon-a-z', value: {field: 'name', asc: true}},
		{label: 'name', icon: '#icon-z-a', value: {field: 'name', asc: false}}
	]">
</knob-dropdown>

<script>
	ko.applyBindings({
		selectedElement: ko.observable()
	});
</script>
```

## knob-inline-text-editor

It's a quite common task to edit a short text. This component has one major boolean state variable, the editMode. If the edit mode is false, then the text value is shown as a text node and there is an edit button next to it. If you click on the edit mode, then it's replaced with a knob-input and a save and a cancel button. The save and cancel functionality can be triggered with pressing enter and the esc key.

### Params

Param | Type          | Required | Default value | Description
---   |---            |---       |---            |---
value | ko.observable | Yes      |               | The initial value is read from this observable and the changes will be written back to it. (Only if you save the changes.)

### Example
```html
<knob-inline-text-editor params="
	value: value">
</knob-inline-text-editor>

<script>
	ko.applyBindings({
		value: ko.observable("")
	});
</script>
```

## knob-items-per-page

This component is used in the knob-paged-list component. It's basically responsible for calculating the actual number of pages based on the number of items and the items per page value. This value is selected from a dropdown list.

### Params

Param            | Type                   | Required | Default value | Description
---              |---                     |---       |---            |---
numOfItems       | ko.observable (number) | Yes      |               | The number of items in a result set.
itemsPerPage     | ko.observable (number) | Yes      |               | The number of items on a page.
numOfPages       | ko.observable (number) | Yes      |               | The calculated number of pages, which are based on the previous two values.
itemsPerPageList | Array                  | Yes      |               | The available numbers of items which will show up in the dropdown.

### Example
```html
<knob-items-per-page params="
	numOfItems: numOfItems,
	itemsPerPage: itemsPerPage,
	numOfPages: numOfPages,
	itemsPerPageList: [
		10,
		25,
		50,
		100
	]">
</knob-items-per-page>

<script>
	ko.applyBindings({
		numOfItems: ko.observable(1230),
		itemsPerPage: ko.observable(10),
		numOfPages: ko.observable()
	});
</script>
```

## knob-pagination

This component is used by the knob-paged-list as well. It's very tightly bound with the knob-items-per-page. Basically if you pass the same numOfPages ko.observable to the two components, then they will smoothly function together.

### Params

Param         | Type          | Required | Default value    | Description
---           |---            |---       |---               |---
numOfPages    | ko.observable | Yes      |                  | You can set the total number of pages with this property. The page selector items will be generated based on this variable.
currentPage   | ko.observable | Yes      | ko.observable(0) | The selected page's value will be written into this ko.observable
afterHead     | number        | No       | 2                | The number of page selectors to be visible at the beginning of the list.
beforeTail    | number        | No       | 2                | The number of page selectors to be visible at the end of the list.
beforeCurrent | number        | No       | 2                | The number of page selectors to be visible before the currently selected item.
afterCurrent  | number        | No       | 2                | The number of page selectors to be visible after the currently selected element.

### Example
```html
<knob-pagination params="
	numOfPages: numOfPages,
	currentPage: current,
	afterHead: 3,
	beforeTail: 3,
	beforeCurrent: 4,
	afterCurrent: 4">
</knob-pagination>

<script>
	ko.applyBindings({
		current: ko.observable(0),
		numOfPages: ko.observable(100)
	});
</script>
```

## knob-paged-list

An easily configurable general paged list with which you can list any kind of data. You can create project lists, galleries or anything related to listing by using this module. The child template can be anything of this component depending on the data you want to show in the list.

The main dependency of the module is [superdata's](https://github.com/EDMdesigner/superdata) store module.

### Params

Param  | Type            | Required | Default value | Description
---    |---              |---       |---            |---
store  | superdata.store | Yes      |               | A store instance from superdata. Every data reading and writing goes through this module.
search | string          | Yes      |               | The field's name based on which the filtering should work.
sort   | Array           | Yes      |               | The field names based on which the you want to have a sorting option.

### Example
```html
<knob-paged-list params="store: store, search: 'title', sort: ['id', 'name']">
	<div>
		<span data-bind="text: data.id"></span>
		<span data-bind="text: data.email"></span>
		<span data-bind="text: data.name"></span>
		<span data-bind="text: data.title"></span>
	</div>
</knob-paged-list>

<script>
	ko.applyBindings({
		store: store //where store is a superdata.store.store instance
	});
</script>
```


## knob-tabs

With the **knob-tabs** component, you can easily create tabbed user interfaces. This component is special in the sense that it works only if you add **knob-tab** components as child components. The params of the **knob-tab** components will be applied to a **knob-radio** component, which will be responsible for selecting the visible tab.

### Params

Param      | Type   | Required | Default value | Description
---        |---     |---       |---            |---
defaultTab | number | No       | 0             | You can set the default selected tab by giving the zero-based index of it.

Also, the knob-tab child elements has to have at least one of the following parameters:
 - label
 - icon (a synonim for leftIcon)
 - leftIcon
 - rightIcon

### Example
``` html
<knob-tabs params="defaultTab: 1">
	<knob-tab params="label: 'tab1', icon: '#icon-grid'">
		content1
	</knob-tab>
	<knob-tab params="icon: '#icon-grid'">
		content2
	</knob-tab>
	<knob-tab params="label: 'tabX'">
		content3
	</knob-tab>
</knob-tabs>
```
## knob-modal

With this component, you can easily create a modal window.

### Params

Param     | Type                    | Required | Default value | Description
---       |---                      |---       |---            |---
variation | string                  | Yes      | "modalHead"   | The variation of the button in modal header section.
title     | string                  | No       | "text"        | Header text in the header element.
icon      | string                  | No       | "text"        | The icon on the left of the header element.
visible   | ko.observable (boolean) | Yes      |               | This is the observable in which the show / hide the modal.

### Example
``` html
<knob-modal params="
	title: 'test modal',
	icon: '#icon-open',
	visible: modalVisible">
	<p>
		Content text
	</p>
</knob-modal>
<script>
	ko.applyBindings({
		modalVisible: ko.observable(false)
	});
</script>
```

## knob-modal - alert

With this component, you can easily create a modal - alert window.

### Params

Param    | Type                    | Required | Default value | Description
---      | ---                     | ---      | ---           | ---
title    | string                  | No       | ""            | Header text in the header element.
icon     | string                  | No       | ""            | The id of the icon on the left of the header element.
message  | string                  | Yes      |               | The message shown.
okLabel  | string                  | Yes      |               | The label on the button.
visible  | ko.observable (boolean) | Yes      |               | This is the observable in which the show / hide the modal.
callback | function                | Yes      |               | The callback function to be executed on pressing the button button.

### Example
``` html
	<knob-alert params="
		title: 'test alert',
		icon: '#icon-warning',
		message: 'I have to alert you about something?',
		okLabel: 'Ok',
		visible: alertVisible,
		callback : confirmCallback">
	</knob-alert>

	<script>
		ko.applyBindings({
			alertVisible: ko.observable(false),
			confirmCallback: function(ok) {
				console.log(ok);
			}
		});
	</script>
```

## knob-modal - confirm

With this component, you can easily create a confirm dialog.

### Params

Param       | Type                    | Required | Default value | Description
---         |---                      |---       |---            |---
title       | string                  | No       | ""            | Header text in the header element.
icon        | string                  | No       | ""            | The icon on the left of the header element.
visible     | ko.observable (boolean) | Yes      | false         | This is the observable in which the show / hide the modal.
message     | string                  | Yes      |               | Content message in the confirm modal window content section.
okLabel     | string                  | Yes      |               | The label of the ok button.
cancelLabel | string                  | Yes      |               | The label of the cancel button.
callback    | function                | Yes      |               | This function will be called when the user clicks on the ok or cancel button. If the ok was clicked, then the param of it will be true, otherwise false.

### Example
``` html
	<knob-confirm params="
		title: 'Confirm',
		icon: '#icon-open',
		message: 'Lorem ipsum dolor sit amet?',
		visible: confirmVisible,
		okLabel: 'Ok',
		cancelLabel: 'Cancel',
		callback: confirmCallback">
	</knob-confirm>

	<script>
		ko.applyBindings({
			confirmVisible: ko.observable(false),
			confirmCallback: function(ok) {
				console.log(ok);
			}
		});
	</script>
```

## knob-notification

With this component, you can easily create a notification bar - info, success, warning and error statements.

### Params

Param     | Type                    | Required | Default value | Description
---       |---                      |---       |---            |---
variation | string                  | No       | ""            | Header text in the header element.
message   | string                  | No       | ""            | Header text in the header element.
icon      | string                  | No       | ""            | The icon on the left of the header element.
visible   | ko.observable (boolean) | Yes      | false         | This is the observable in which the show / hide the modal.

### Example
``` html
	<knob-notification params="
		message: 'important message',
		icon: '#icon-done',
		variation: 'success',
		visible: notificationVisible
	">
	</knob-notification>

	<script>
		ko.applyBindings({
			notificationVisible: ko.observable(false)
		});
	</script>
```


## Styling knob components
You can use simply themes, and color sets. Defines the color, and use them in any module.

### Example - define
```javascript
initKnob({
	theme: "default",
	colorSet: {
		primaryColor: "#2199e8",
		secondaryColor: "#777",

		info: {
			text: "#00529b",
			background: "#bde5f8"
		},
		success: {
			text: "#4f8a10",
			background: "#dff2bf"
		},
		warning: {
			text: "#9f6000",
			background: "#feefb3"
		},
		error: {
			text: "#d8000c",
			background: "#ffbaba"
		},

		white: "#fff",

		lightGray: "#e6e6e6",
		mediumGray: "#cacaca",
		darkGray: "#8a8a8a",

		black: "#000",
		transparent: "transparent"
	}
});

```

### Example - during use
```javascript
"default": {
	"default": {
		"backgroundColor": theme.secondaryColor,
		"borderColor": theme.secondaryColor,
		"color": theme.black,
		"fill": theme.black
	},
	"hover": {
		"backgroundColor": theme.darkGray,
		"borderColor": theme.darkGray
	},
	"active": {
		"backgroundColor": theme.success.background,
		"borderColor": theme.success.background
	},
	"disabled": {
		"backgroundColor": theme.mediumGray,
		"color": theme.lightGray,
		"fill": theme.lightGray
	}
}

```