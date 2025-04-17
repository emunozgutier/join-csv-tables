// Load jQuery
var jq = document.createElement("script");
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
document.getElementsByTagName("head")[0].appendChild(jq);
// Wait for jQuery to load
function waitForJQuery() {
  if (typeof jQuery === "undefined") {
    setTimeout(waitForJQuery, 1000);
  } else {
    extractDataSets();
  }
}
// Extract data sets
async function extractDataSets() {
  let uniqueDataSets = new Set();
  let i = 1;
  while (
    $(".pimsleur-pages-practice-components-card-game-components-header-count")
      .text()
      .includes(i + "/")
  ) {
    // Click on the card to reveal the back
    $(
      ".pimsleur-pages-practice-components-card-game-components-flip-card-flipCardInner",
    ).click();
    await new Promise((r) => setTimeout(r, 1000)); // Wait for 1 second
    // Click "Got it" to proceed to the next card
    $(
      ".pimsleur-pages-practice-components-card-game-components-footer-button:contains('Got it')",
    ).click();
    await new Promise((r) => setTimeout(r, 1000)); // Wait for 1 second

    // Obtain the data set
    const dataSet1 = $(
      ".pimsleur-pages-practice-components-card-game-components-flip-card-flipCardFront .pimsleur-pages-practice-components-card-game-components-flip-card-content span:nth-child(1)",
    ).text();
    const dataSet2 = $(
      ".pimsleur-pages-practice-components-card-game-components-flip-card-flipCardFront .pimsleur-pages-practice-components-card-game-components-flip-card-content span:nth-child(2)",
    ).text();
    const dataSet3 = $(
      ".pimsleur-pages-practice-components-card-game-components-flip-card-flipCardBack .pimsleur-pages-practice-components-card-game-components-flip-card-content span",
    ).text();

    // Store the unique data sets
    const uniqueEntry = dataSet2 + "\n(" + dataSet1 + ")@" + dataSet3 + "#";
    uniqueDataSets.add(uniqueEntry);

    i++;
  }
  // Convert the set to an array
  const uniqueEntriesArray = Array.from(uniqueDataSets);
  // Convert the array to a CSV string
  let csv = "dataSet1,dataSet2,dataSet3\n";
  uniqueEntriesArray.forEach((entry) => {
    csv += entry + "\n";
  });
  // Output the CSV string
  console.log(csv);
}
// Start waiting for jQuery to load
waitForJQuery();
