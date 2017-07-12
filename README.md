# Corey's Inventory App a.k.a Kanban Inventory

## Overview

This application was built with MySQL, Sequelize, Express, Node.js, and React.
This is an inventory application that can be used by any company that still uses pen-and-paper inventory systems.  This application will save significant labor hours and costs for every inventory count, and it will greatly improve the learning curve for new employees. 

Companies with massive inventory requirements such as Walmart already use automatic barcoding inventory systems, and large warehouses can use inventory systems utilizing RFID tags.  However, many large companies, such as restaurants, need to conduct daily inventory counts on every product.  Domino's Pizza is a good example.  They were recently named the largest pizza chain in American, and it is my understanding that every chain conducts daily inventory counts using pen and paper.  One reason for this issue is the inconsistency of store layouts.  If every store layout and product storage was exactly the same, creating a master inventory checklist would be easy.  However, most Domino's franchisees lease or buy existing buildings to adapt for their businesses.  This practice makes sense financially, but it also means that almost every store location is slightly different.   This mean that in every location there are different storage rooms, office space, etc.  This creates a logistical issue in creating a master inventory list that can be used by every chain store. 
 
From a process engineering standpoint, any small inefficiency in the system adds up and over time can cost a significant portion of the labor margin.  In addition to unique location layouts, there are other inefficiencies to the pen-and-paper inventory methodology.  Employees conduct inventory counts in one of a few different ways:
* 1) Begin observing items in a location and search for the item on the list to mark the count, and attempt to count every item in a location before moving to the next location.  The problem with this method is that items are typically listed alphabetically and the user must find them by scanning the list.  This would only take a few seconds if the items were listed exactly as you would expect on a single page, but there is a learning curve to discerning the item names.  For example, trash bags might be listed as "liner, trash 50 gal", and lists are typically longer than one page.  Also, items are typically located in more than one area.
* 2) Move to a location and begin scanning the list to find all items in the location to mark the count.  This method might save a little time because the employee conducting the inventory is typically more familiar with the location of the item within a location than the location of the item on the list.  The problem with this method is that it still takes time to scan the list for each item, and it is easy to miss items which causes the employee to move back and forth between locations.
* 3) Some companies attempt to group items by location which is a better method.  The problem with this method is that most locations are not the same.  Even if every location made a unique segmented list specific to their location, most items are located in more than one place which causes the employee to sum the items together from multiple places on the list once completed.
* -** In addition, all three methods require calculations after the count is complete.  The most advanced systems require data entry into an inventory system to calculate orders and compile data tracking.  Less sophisticated systems require the employee to manually add items and calculate the order 

#### Common sense would suggest that the following would be the optimally efficient way to do an inventory check:
 * 1. Make only one trip around the store, stopping at each location only once
 * 2. Instantly know where to find an item on the list, and don't waste any time looking for items
 * 3. Have a system that automatically sums the count
 * 4. Have a system that automatically enters the data into the tracking system
 * 5. Have a system that automatically places the order

   Enter Kanban.. What is Kanban? Here is an explanation from [leankit](https://leankit.com/learn/kanban/what-is-kanban/):

Kanban is Japanese for “visual signal” or “card.” Toyota line-workers used a kanban (i.e., an actual card) to signal steps in their manufacturing process. The system’s highly visual nature allowed teams to communicate more easily on what work needed to be done and when. It also standardized cues and refined processes, which helped to reduce waste and maximize value.

It starts with your brain.

A picture is worth a thousand words for scientific reasons: The brain processes visual information 60,000 times faster than text. Forty percent of all nerve fibers connected to the brain are linked to the retina. Visual information comprises 90 percent of the data that comes to our brain, suggesting that our neurological pathways might even prefer pictorial displays over text.

-----
Kanban has also been adapted to help with workflow for software development, but manufacturing is a good example of its benefits.  Picture an assembly line full of workers that are prompted on how to switch tasks simply by seeing a certain color.  For example, what if you could view a yellow card and instantly associate that color with a set of several pre-defined tasks:  stop this, start that, get ready for that, this is what's next, etc.  Our brains can associate the meaning behind visual signals much faster than reading text.


#### This application uses Kanban principles to streamline the inventory process by using color-coding to help the brain process information faster
 
There are several inefficiencies this app solves:

* 1) The time is takes to scan the inventory text to find the item
* 2) The method that is used to choose which item to check
* 3) The issue of having items stored in more than one location
* 4) The problem of moving back and forth between locations to find items
* 5) The time is takes to sum the data and calculate the order after the count is complete

### Instructions for users
* 1) Log in or sign up with user credentials 
* 1) Create inventory areas and assign colors
* 2) Create items and designate up to two areas.  Items that are in more than two areas can be listed multiple times
* 4) Begin inventory:
a) Move to an area and begin completing the inventory list by scanning for the color associated with the area and entering item totals.  
b) Enter the total for the item (in unit decimals) into the form position and move to the next form position with that color.  Once a total is entered, the color for that form position changes to gray. 
c) Enter values for every form position with the same color before moving to the next location.
* 5) Once all forms positions are filled, or all colors have changed to gray, submit the inventory and create a PDF of the results if desired


## Overview of code

## Routing

#### Express Routes
The following requests are routed with Express and Node.js.  They are called using Axios:  
* ”/api/signup” and "api/login" POST routes area used to authenticate the user
* "/api/area" POST route for creating a new inventory area
* ”/api/area/:companyName” GET route is used to retrieve inventory areas from MySQL per company
* "/api/areaColor/:companyName/:area" GET route is used to retrieve inventory area colors from MySQL per company
* "/api/table/:companyName/:date" GET route for retrieving inventory per data from MySQL per company
* "/api/item" POST route is used to create new items in MySQL per company
* "/api/items/:companyName" GET route is used to retrieve items from MySQL per company
* "/api/inventory" POST route is used to create an inventory count and results calculation per company using MySQL
* "/api/items/:companyName/:itemId" DELETE route is used to delete an item from MySQL
* "/logout" GET route redirects a user to the login page



#### React Routes
The following paths are routed using the React router methodology:
* “/login” renders the LoginForm component as a child of the Main component
* “/signup” renders the SignupForm component as a child of the Main component
* “members/:companyName” renders the Member component as a child of the Main component
* “inventory/:companyName” renders the Inventory component as a child of the Main component
* “table/:companyName/:date” renders the ResultsTable component as a child of the Main component

### Components 
* The following units are broken into individual components and are self-explanatory: Header, HeaderBlank, HeaderCreate, HeaderTable, Footer, LoginForm, SignupForm 
* Member Component:  The Member Component renders the following:
1) NewAreaForm Component for creating new inventory areas and assigning colors
2) ItemForm Component for creating new items
3) AreaLegend Component to display the different areas and associated colors
* Inventory Component: renders the inventory information and dynamically creates the form for the inventory count
* ResultsTable Component: calculates the results of the inventory count and displays the results

This application is deployed on Heroku and can be viewed here: [coreys-inventory-app](http://corey-inventory-app.herokuapp.com/):

Either login and begin the user instructions (using a fake email and company name is fine), or use this guest email and password:
email: test@test.com
password: test
