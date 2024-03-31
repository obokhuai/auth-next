function xmlExample(requestData) {
  const start =
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?><IATA_AirShoppingRQ xmlns="http://www.airquest.com/api/v1/AirShoppingRQ"><AugmentationPoint><Agency><AgencyID>DERDE</AgencyID></Agency><PccList><Pcc><Name>FRADR2123</Name><Crs>AMA</Crs></Pcc></PccList><SearchCriteria><BaggageIncluded>false</BaggageIncluded><Currency>EUR</Currency><MaxFares>2</MaxFares><TaxBreakdown>true</TaxBreakdown><FlightGrouping>true</FlightGrouping></SearchCriteria></AugmentationPoint><PayloadAttributes><CorrelationID>Test_AirShopping</CorrelationID></PayloadAttributes><Request><FlightCriteria>';
  let flights = "";

  let j = 1;
  for (let i = 0; i < requestData.length; i++) {
    const { to, from, date } = requestData[i];
    // Set 'dep' with 'from', 'dest' with 'to', and 'date' with 'date'
    var flight =
      "<OriginDestCriteria><ConnectionPrefRefID>CP0" +
      j +
      "</ConnectionPrefRefID><DestArrivalCriteria><Date>" +
      date.split("T")[0] +
      "</Date><IATA_LocationCode>" +
      to +
      "</IATA_LocationCode></DestArrivalCriteria><OriginDepCriteria><Date>" +
      date.split("T")[0] +
      "</Date><IATA_LocationCode>" +
      from +
      "</IATA_LocationCode></OriginDepCriteria><OriginDestID>O" +
      j +
      "</OriginDestID><PreferredRBD_Code /></OriginDestCriteria>";
    flights += flight;
    j++;
  }
  const end =
    "</FlightCriteria><Paxs><Pax><PaxID>P1</PaxID><PTC>ADT</PTC></Pax><Pax><PaxID>P2</PaxID><PTC>ADT</PTC></Pax></Paxs><ShoppingCriteria><FareCriteria><FareTypeCode>PUBL</FareTypeCode><PrefLevel><PrefLevelCode>Required</PrefLevelCode></PrefLevel></FareCriteria></ShoppingCriteria></Request></IATA_AirShoppingRQ>";
  return start + flights + end;
}

const url = "https://uat-api-dertour.airquest.com/aq4/api/v1/airshopping";
import { NextResponse } from "next/server";
//const url = 'http://localhost/aq4/api/v1/airshopping';
//  your actual credentials
const username = "hhaag";
const password = "sommer2011";
const credentials = `${username}:${password}`;
const base64Credentials = Buffer.from(credentials).toString("base64");

export async function POST(req, res) {
  try {
    const reqData = await req.json();
    // Fetch data from your backend API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + base64Credentials,
        "Cache-Control": "no-cache",
        "Content-Type": "application/xml",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Accept-Language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
        Origin: "http://localhost:3000",
      },
      body: xmlExample(reqData),
    });
    //const response = await axios.post(url, options);
    const data = await response.text();
    // Return the fetched data
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error: " + error });
  }
}