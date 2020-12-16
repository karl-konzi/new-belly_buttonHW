// select test subject ID
var getID = d3.select("#selDataset")
//  reading data & populating
d3.json("samples.json").then((karlData) => {
    console.log(karlData)
    karlData.names.forEach (data=> {
        getID.append("option").text(data).property("value")
    
    }) 
    //  calling the update function
    optionChanged(karlData.names[0])
})
//   defining the update function
 function optionChanged(newID)
    {
        d3.json("samples.json").then((newData) => {
        filterdata = newData.metadata.filter(nw=> nw.id==newID)
        // fetching the first element
        firstElement = filterdata[0]
        // console.log(newData)
        console.log(filterdata)

        // select demographic form

        var demo = d3.select("#sample-metadata")
        demo.html("")
        Object.entries(firstElement).forEach(([key,value]) => { 
            demo.append("p").text(`${key}-${value}`)
        } )

        var result =newData.samples.filter(sid => sid.id == newID)

        var firstsample = result[0]

        console.log(firstsample)
        var topSample = firstsample.sample_values.slice(0,10).reverse();
        var toplabels = firstsample.otu_labels.slice(0,10).reverse();
        var topOtu = firstsample.otu_ids.map(id => `otu_ids ${id}`).slice(0,10).reverse();

    // creating our trace

    var trace = {

        x : topSample,
        y : topOtu,
        text : toplabels,
        type : "bar",
        orientation: "h",

    }

    // converting trace into arrray

    var samplebar = [trace]
    Plotly.newPlot("bar", samplebar)

    var Bubletrace = {

        x : firstsample.otu_ids,
        y : firstsample.sample_values,
        text : firstsample.otu_labels,
        mode  : "markers",
        marker : {
            color : firstsample.otu_ids,
            size : firstsample.sample_values
        }

    }

        var samplebubble = [Bubletrace]
        Plotly.newPlot("bubble", samplebubble)

})}



