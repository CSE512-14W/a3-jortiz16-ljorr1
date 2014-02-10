###Project Name
Visualizing the Salem Witch Trials

#Team Members
- Laurel Orr ljorr1@cs.washington.edu
- Jennifer Ortiz:  jortiz16@cs.washington.edu

#Running Instructions
You can access our visualization at http://cse512-14w.github.io/a3-jortiz16-ljorr1/. You can also download the files into one folder, navigate to that folder in the terminal, run `python -m SimpleHTTPServer 8888`, and access it from http://localhost:8888/index.html.

##Background
The event we wanted to visualize was the Salem Witch Trials, which occurred in Salem, Massachusetts in the late 1600s. During this time, many were accusing others of being witches, using evidence we would now consider unjustifiable. This resulted in a mass hysteria of accusations across Salem Village and surrounding towns throughout 1692. The data we eventually used was a list of accusers, who they accused, when they were accused, and the date the person was executed (if applicable). We additionally had a list of all the accusers and accused, a description of who they were, their age, and if they supported the minister, were against the minister, or did not disclose their opinion.

##Storyboard Description
Our goal was to be able to see the accusations of the villagers against each other through a visualization. In the sketch below we show some of the interactions we wish to see through a network graph. Each node represents a person and each edge represents an accused/accuser relationships where the edge arrow points to the accused. Each family member (a family is the people who share a last name) is connected to a “family” node through an undirected edge. In the image below, we show examples of each. 

https://raw.github.com/ljorr1/a3-jortiz16-ljorr1/master/WriteUpPics/Fig1.png
Figure 1: Accuser/Accused and the Families Relationships

There are three interactions we planned in this sketch:
 1) Hover: Users can hover over any node to see the name of the person the node 
represents
2)  Checkbox: The user can select to see either those people in favor of Parris (a 
prominent minister around the Salem witch trials) or against. We encode each of the sides by a color of the node
3)  Slider: The user can move the slider across a timeline to see how events 
progressed. At a certain time, we only show the edges (accusations) that occurred during that time

https://raw.github.com/ljorr1/a3-jortiz16-ljorr1/master/WriteUpPics/Fig2.png
Figure 2: Hover and Checkbox Interactions

https://raw.github.com/ljorr1/a3-jortiz16-ljorr1/master/WriteUpPics/Fig3.png
Figure 3: Hover and Checkbox Interactions

In Figure 4, we display a sketch of the background information. We decided to provide background information to the visualization in case the user wanted to understand more about the events that took place during the trials. After the user reads the box, she may exit in order to start exploring the data.
 
https://raw.github.com/ljorr1/a3-jortiz16-ljorr1/master/WriteUpPics/Fig4.png
Figure 4: Background Information Box
 
##Description of Final Visualization
For the final visualization, there are two phases. First, the viewer is shown the historical background behind the Salem Witch Trials. This feature is informative and may even provide the user with curiosity as to how certain accusations unfolded throughout the trials. Once the user exits the screen, she is taken to the second phase of the visualization. Here, she can begin to explore the dataset. The dataset consists of nodes that are encoded by color based on their affiliation with respect to Minister Parris. Families of nodes are encoded through light-blue “hub” groupings. There are several options that can occur from this point. One, the user may select the “Background” bottom and be taken back to the first phase. Two, the viewer may select either the “Next” or “Back” button. These buttons help the user navigate through each of the events based on the time. During a selected time, the graph will display those accused and their accusers based on the red paths that are displayed. If a viewer continues to proceed through more events, the old events are dimmed, showing the progression of time. Nodes that are outlined in red represent those who died due to the trials. At any time, the user may decide to click on a node. This will display information on the right side of the page including the person’s name, age, and a small description. 

*PICTURE HERE: DO THIS AFTER LAYOUT IS DONE
 
##Changes Between the Storyboard and Final 
-Slider: The timeline to see events on the visualization was originally intended to be a slider. Upon implementing this, we realized it was difficult to detect if the user placed the slider exactly on one date or another, making our encoding of red edges as events occurring at a particular date ineffective. We decided to work on a feature that allowed the user to click through the events. Once they reached the end, the timeline would restart at the beginning. 
-Checkbox: We realized that although clicking a checkbox may be more exciting, it was not the most effective means for communicating village divisions. We could easily use node color to statically represent the three categories of villagers (pro-minister, anti-minister, and unknown). This eliminates possible confusion when using a checkbox and keeps the focus on the accusations over time, not the changing node color.
-Additional Text Feature: We had initially planned to place the information about each person in a tooltip box once the user hovered her mouse over a node. We decided against this since the descriptions could be long enough to make the tool-tip box occlude important connections. We instead added a text box on the right that described the person in more detail while keeping the tooltip displaying the name.
-Background Button: Since the user may forget or not read the historical context upon entering our visualization, we decided to add a background information button to allow the user to return to that screen.
-One of the accused in our dataset died in prison. We felt that even though she was not hung, she was killed because of the witch trials so included that death in our visualization.

##Development Process
#Gathering Data
We found potential datasets at http://www.tulane.edu/~salem/. This website was made by Richard B. Latner, a professor at Tulane University, and his goal is to take viewers through a basic investigation of data he provides on the Salem Witch Trials to shed some light on why the trials occurred. He also produces some basic graphs showing interesting trends such as a histogram of the number of witch accusations over time.

https://raw.github.com/ljorr1/a3-jortiz16-ljorr1/master/WriteUpPics/Histogram.png

After going through his website, we had a clear sense that there were some interesting trends to show and wanted to do it in a better way than a histogram. The data we received from his website included a list of all the people accused of witchcraft in Massachusetts and a list of people living in Salem Village who were supportive of the minister, against the minister, or did not state their opinions. By going through our visualization, you will understand why the minister is important information.

The main problem we had with using this data alone was that we only had the witches accused, not the accusers, and we only had more detailed information for the people living in Salem Village, not neighboring towns. In Tableau, we played around with just visualizing the number of accusations per town over time, but that was not as interesting nor very engaging.
    
https://raw.github.com/ljorr1/a3-jortiz16-ljorr1/master/WriteUpPics/Fig5.png
Figure 5: Snapshot of one month of accusations per village

We then decided to focus only on the people of Salem Village and gather more data on who accused whom because we felt showing the social interactions would be the most interesting. We used http://salem.lib.virginia.edu/home.html and http://www.17thc.us/primarysources/ to look at court records from that time. For each person who lived in Salem Village and was accused of witchcraft, we recorded all the people who testified against him or her in court (in a court record titled “person A vs person B”, we recorded person A if B was one of our accused witches). We then cross-referenced these people with the data on who supported the minister or not to associate a label with each person in our data: pro-minister, anti-minister, unknown. The main hurdle in the cross-referencing was naming. There were misspellings and name errors in the Tulane dataset. For example, one sheet would have the name John Willkins and another sheet would have the name John Wilkens when they were the same person. After resolving these errors and gathering the accusation data, we read through some of the court records and used Wikipedia to come up with a sentence or two of information on each person in our dataset. This was a very time consuming part because although reading through old court records is entertaining, trying to understand 17th century english court record shorthand is not straightforward.

From start to finish, we augmented our existing dataset on the witches accused in Salem Village to create a master list of Salem villagers who accused the witches, when they did so, and if they supported the minister or not. We split the work between us evenly by having Laurel take care of cleaning the data, Jen got the list of accusers, and we divided the list of villagers in half and had each member collect sentences of her half. This process took a combined time of probably 40 hours which is kind of ridiculous, but we were stubbornly determined to get the data we wanted.

#Deciding on a Goal
Once we had our dataset ready to go, we set out formalizing our storyboard and splitting up the work. We knew we wanted to do a social network interaction to show the relationship between the accusers and accused. We also knew that the time frame of the accusations was interesting because of the histogram from the Tulane website, so we decided to have our interaction include going through the months and seeing which accusations occurred when, preferably with some form of a slider. The other social interactions were familial bonds, and instead of having the clutter of each group of villagers with the same last name being in a complete graph (all members connected to each other), we decided to have each member connect to one node which represented the family.

We knew we wanted to include the villagers’ leanings for or against the minister, so we thought to add a checkbox for the three possible labels and to color the nodes depending on which box was checked. The last major interaction was to include a tooltip that hovered over a node showing information about that node. We felt this is a standard way of conveying interesting information at the user’s request while leaving the visualization clean and uncluttered. We also wanted a background information slide to give the user some context to understand why the node colorings are important.

After finishing our design, we split up the work as shown below.
    Laurel: Finalize and proof-read the villager information, format the data to work with the visualization, determine the layout of the nodes, set up links and node colors, develop tool-tips and information box, create family groupings, make background information slide
    Jen: Sketch up our storyboards, develop the slider to interact with the links and the “next”/”back” buttons, determine timing so that all the right design encodings turned on at the right times, create a legend

Below we highlight some of our more major design decisions.

#Node Layout
The first step was to determine how the nodes were going to be presented on the visualization. From looking online and at examples, we came across the D3 forced layout which represents nodes and edges as objects and forces that act on each other. After taking and modifying sample code, we had a basic layout of all the nodes, but did not like the ability for the user to drag the nodes around. The dragging motion really emphasized the forces acting on the nodes rather than the nodes themselves. We did not want that added distraction, so changed to a static force layout where instead of calling the force function at each tick, we called the force function 500,000 times and then displayed the resulting nodes. This did mean that whenever you refreshed the page, you would get a different layout. We played around with the idea of using the force layout to find exact x and y positions of the nodes and then hard code those into the data, but we thought the changing layout facilitated exploration. We did not know what the best layout was for this data and didn’t want to restrict potential data exploration. What if one particular layout highlighted some trend that was less apparent in other layouts? Thus, we decided to stay with a static force layout that changed on a page refresh.

The next key feature was choosing how to represent families. Our original plan was to have all members of one family connect to a family node. When we implemented this, the layout was unfocused and the members of one family were scattered across the graph. The family nodes, which were a different color, just seemed distracting and confusing. So, we needed to connect the families to each other more closely without sacrificing clarity. To connect the families, we did make each family unit a complete subgraph (and just not display the links) and made the links between them be a smaller length than the accusation links. These family units were more connected but it still wasn’t clear if a group that seemed to exist on the data was a family or not. To tackle his last problem, we decided to highlight the background of the nodes that are in a family. If a user wanted to know specifically which family one group is, she simply had to drag her mouse over the node to activate the name tooltip to see the last name.

Overall the hardest part of the node layout was getting the background shaded hulls, which represented the families, to work. The force layout was fairly straightforward, and although it took a while to get the data in the proper format, it was not a challenging task. The overall time it took to implement the layout was roughly 10 hours.
 
#Slider
The timeline for the graph was initially meant to be a slider. The slider template was obtained from a Github project. The viewer would slide a handle across the timeline to see changes in events based on the graph. This did not work out since based on the domain, it was difficult to see specific events. In other words, the user had to move the slider at a very specific position in order to see an event. In some cases, we were even not able to find certain events through this method. Thus, we changed the code to only show discrete steps. It was a challenge to figure out how to make the timeline show the dates from the data. Upon reading the documentation we found out that the timeline template we used was actually based on the Axis class from d3. Once we figured this out, we were able to create our own Axis based on the dates and then proceeded to attach it to the timeline. We also disabled the ability to slide the handle of the timeline. We felt that it would confuse the user if she tried to slide the handle to a date where there weren’t any events. Also, moving a slider indicates a continuity in the events that is not true in our data. Accusations occurred in groupings at discrete times, not continuously throughout 1692. Instead, the user can now navigate using the “Next” and “Back” button. 

For each event on the timeline, we made sure to show the appropriate events on the graph. There were two things that updated through each step. First, the slider needed to update its position. The way we did this is by deleting the contents of the div container holding the timeline and proceeded to add another timeline with the correct position. Second, the graph paths needed to be updated. Since each edge has a date, we were able to color those appropriately. When the timeline is pointing to a certain date, all the edges with matching dates are colored in red. Also, all the markers (arrowheads) were shown as well. All edges/markers where the date is before the date shown is colored gray at a certain opacity. The farther away the current time is, the lighter the path became. Overall, the slider took about 20 hours to implement. 

#Miscellaneous
Implementing the background information slide was not too challenging. We had to make sure the user could navigate from the slide to the visualization and back again smoothly, and we used buttons to do so. We also added an opaque background to indicate that the user is not supposed to interact with the visualization while reading the information. The hardest part was positioning the button in a logical place.

Once we learning that our descriptions of the villagers were too long for the tool-tip, we moved the information section to an outside box. We liked this feature because it allowed a user to click for more information and for that information to stay around after the user moved her mouse away from a node. This way, users would have to remember less information and could focus more on the interaction. The hardest part of this was also getting the box to be positioned nicely.

The overall time to implement the miscellaneous features and do small changes such as finding the right colors and formatting the layout took about 10 hours.

#Time Breakdown
Overall, the data gathering took about 40 hours, the design and coding took about 40 hours, and the write-up took about 7 hours. The hardest part was getting the data we needed and sifting through the court records. We are really pleased with the data we got, and we knew we had to get a lot of it ourselves, but it still took a long time. The coding was not easy, but it was fairly enjoyable and made possible because of google. The most challenging part of the coding was getting the slider to work and getting the node layout to look decent. 

##Source Code
Style sheets
d3.slider.css: style sheet for the slider (this is from: https://github.com/turban/d3.slider)
style.css: our own style sheet
HTML
index.html: our main html page
Javascript (D3)
d3.slider.js: javascript file for the slider (this is from: https://github.com/turban/d3.slider)
interaction.js: our main javascript file that includes all the D3 and interactions
JPG
legend.jpg: the picture for our node color legend
Data Sources
links.csv: the csv of the links between nodes
nodes.csv: the csv of the node data
