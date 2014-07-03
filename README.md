# OpenDoor
This is a Node.Js project for an alarmed door running on any Linino boards.
It use the linino-components library to handle the Linino GPIO.

When the correct code is typed the door change its status from OPEN to CLOSE or viceversa.
When it is OPEN the alarm, on the magnetic switch, is activated.
When it is CLOSE The alarm is de-activated.

With the alarm active, if the magnetic switch is triggered by the open of the door a message is send to the 
program that control the camera to tar the latest images.
At the end an eMail, with the tar, will be send to the configured email account.

<strong>pre requisite</strong>
The project works with the <strong><i>DoorOpen</strong></i> Linux project that write the caputerd images in
a specific directory on the SD mounted on Linino board.

## Usage



## Developing
### Known limit
The code is hard coded, it is not configurable
The project start with the door reconized as open, but not alarmed.


### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
