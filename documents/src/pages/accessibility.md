<!--
type: page
title: Accessibility
location: ./accessibility/overview
layout: default
-->

# Accessibility
[The World Report on Disability](https://www.who.int/disabilities/world_report/2011/report.pdf) revealed that over 15% of the global population experiences some form of disability, and a recent study by [The Valuable 500](https://www.tortoisemedia.com/disability100-report/) suggests that disability is more prevalent in the business world than most people realize.

In keeping with this growing public awareness, LSEG Refinitiv has signed on as a member of The Valuable 500 and made a commitment to inclusion. 

!>Just as importantly, our customers have been telling us that their own internal policies require us to deliver products that are as accessible as possible.

Consequently, the Element Framework components have been developed and tested with the needs of disabled individuals in mind. Our goal is WCAG 2.1 AA compliance, and while we can never perfectly accommodate every possible user and use case, we are committed to continual improvement. 

It is important for you to be aware that leveraging the Element Framework will not by itself make your product UI accessible. Teams still need to implement complimentary functionality in order to ensure that the entire user journey is an accessible experience. 

Below, we have gathered some best practices to help you make your product UIs accessible.

## Testing your code for accessibility
The following checkpoints should be part of your development and release cycle:

### Test with a keyboard
Try to navigate and operate the product you are working on using only a keyboard (do not utilize a mouse at all). Can you complete a journey using the keyboard alone? More info.

### Test with a screen reader
Install a screen reader on your machine. For Mac users, there is a built in VoiceOver screen reader. For Windows users, install a free copy of the NVDA screen reader. Does basic screen reader navigation and operation work properly on your product?

### Test viewing in grayscale
Enable grayscale mode on your machine. For Mac users, enable the Grayscale Display Filter in the Accessibility settings. For Windows users, enable the Grayscale Colour Filter in the Ease of Access settings.

### Test practical workarounds
When implementing accessible solutions for complex UI elements is not possible, remember that workarounds that allow disabled users to move forward in their workflow are acceptable solutions. For example, is there a way for users to download the data from a data table or grid so they can open it in Excel?

## Color accessibility
Color blindness is [more prevalent](https://www.colourblindawareness.org/colour-blindness/)  than many people realize. One in eight males and one in twelve females are believed to struggled discerning different colors. What’s more, non-color-blind users who suffer from deteriorating eyesight or those using computers under sub-optimal lighting conditions also find it difficult to recognize colors. Feedback from our users supports these observations. 

In response, our Design teams strive to convey information using indicators beyond color alone. The Element Framework components have been designed and tested to ensure that colors have sufficient contrast ratio and brightness. 

Nevertheless, UI developers are still encouraged to quality test color contrast and to ensure that all components work as expected in both Dark and Light modes.

## Keyboard accessibility
People with motor disabilities may favour using the keyboard alone when interacting with computer software. Anecdotal evidence also suggests that financial professionals such as Traders prefer the rapidity and ease of keyboard navigation over using a mouse or other pointing device.  

Consequently, the Element Framework components have been engineered for full compatibility with keyboard manipulation. They strive to provide a consistent user experience across Refinitiv products based on the keys diagrammed in figure 1 below. 

![Figure 1: Basic keyboard interaction keys](https://user-images.githubusercontent.com/81604092/144179777-585af83e-37ca-45f3-abd1-6317093e8f43.png) "Figure 1: Basic keyboard interaction keys")

When developing your UI, be cognizant of the common keyboard interactions noted below, which users tend to expect to encounter.

- Only interactive elements should receive keyboard focus - users typically expect to press Tab or Shift+Tab to give focus to elements that they can interact with.
- Once interactive elements receive focus, they can then be activated using common activation keystrokes such as SpaceBar or Enter.
- Components that contain additional options within them, such as Radio Bar, Tab Bar and Select, can be sub-navigated using Arrow keys.
- Interactive elements can be dismissed using the Escape key. For example, hiding a Tooltip or Overlay.

Keyboard navigation is best implemented in such a way that it promotes logical rules of orientation and navigation (see figure 2 below).

- Focus usually starts from the top-left of the screen when it first loads.
- Focus can be followed easily via the use of a visually consistent focus indication.
- Upon activation of a component, focus can automatically be initiated on a logical starting point. For example, when an Overlay Menu or Overlay is highlighted, focus programmatically moves to the first item.
- Modal components can restrict the focus to remain within the modal region. 
- When a control is dismissed, focus should be returned to the triggering element. 

![Figure 2 - Focus starts from the top and follows logical order](https://user-images.githubusercontent.com/81604092/144179893-7a51ceba-06f1-453f-8abb-cd6a5a64b938.png "Figure 2 - Focus starts from the top and follows logical order")

## Visual impairment accessibility
Studies show that when most people reach the age of 40, they have already begun to experience [deterioration of their eyesight](https://www.aoa.org/healthy-eyes/eye-health-for-life/adult-vision-41-to-60-years-of-age?sso=y). Individuals who struggle with sight impairment need ways to enlarge a user interface so they can better see the content. Common examples include manually enlarging text size or zooming into the screen. 

Those who must deal with more severe vision impairment may use specialized software that allows them to increase contrast, zoom and read out content that displays on the screen. In fact, standard operating systems often provide users with basic versions of such tools. 

Developers should be aware that LSEG Refinitiv Workspace offers features to help users avoid the use of specialized software, such as text resizing, dark and light modes, and adjustable market movement colors. The best practices of software testing and release dictate that developers check the product UI’s ability to leverage these helpful features.

## Screen reader accessibility

Screen readers are specialized software to describe what is on a screen so that users with severe vision impairment can understand and interact with a device. Screen readers rely on semantic coding to enable users to perceive, operate and understand content on the screen. Thus, the effectiveness of screen reading software is significantly reliant on properly implemented front-end code. 

When testing your UI for screen reader compatibility, keep in mind that users commonly [pair a screen reader with a certain browser](https://webaim.org/projects/screenreadersurvey9/#browsercombos), because measurable differences exist in interoperability and support. 

Below are common pairs of screen readers and browsers. 

- JAWS with Edge/Chrome/Firefox
- NVDA with Chrome/Firefox
- VoiceOver with Safari/Chrome

A good rule of thumb is that if you ensure keyboard accessibility it will also benefit screen reader accessibility. Below are considerations specific to testing your code with a screen reader.

- Content should be coded with semantic HTML. Tags such as ARIA can be used to provide accessible information to elements. 
- Content such as headings, lists, tables and forms should use appropriate tags (including ARIA).
- Page metadata such as title and document language should be defined.

![Figure 3 - HTML semantics and ARIA equivalents](https://user-images.githubusercontent.com/81604092/144179904-bf9efb47-68a4-45e7-b126-a99f5957a775.png "Figure 3 - HTML semantics and ARIA equivalents")

While some Element Framework components may not be fully compatible with screen readers in all situations, we continue to improve their performance over time. 

## Other assistive technologies
Be aware that there are myriad assistive technologies that users may employ to help them access a computing device. For example, Dragon Naturally Speaking for processing voice commands or Dolphin SuperNova and ZoomText for magnification. Touch-screen devices also pose unique challenges. As we advance the accessibility features of the Halo Design System, technologies like these will increasingly be supported.

## Useful resources

For more information about developing excellent accessibility, check out these links.

- [WCAG 2.1 Quick Reference Checklist](https://www.w3.org/WAI/WCAG21/quickref/) - appropriate level is AA
- [W3C guide to making components accessible](https://www.w3.org/TR/wai-aria-practices/)   
- [ISO 30071-1](hhttps://www.iso.org/standard/70913.html) (and its forerunner BS8878, and before that PAS78)