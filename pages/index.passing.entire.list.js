import Layout from '../components/MyLayout.js'
import Link from 'next/link'
/*First of all we need to install isomorphic-unfetch. 
That's the library we are going to use to fetch data. 
It's a simple implementation of the browser fetch API, but works both in client and server environments. */
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <Layout>
    <h1>5 Random Star Wars Characters</h1>
    <div dangerouslySetInnerHTML={{__html: props.listItems}}></div>
  </Layout>
)

// lifted from https://stackoverflow.com/questions/8378870/generating-unique-random-numbers-integers-between-0-and-x and using a modification lifted from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function generateRange(pCount, pMin, pMax) {
  const min = pMin < pMax ? pMin : pMax;
  const max = pMax > pMin ? pMax : pMin;
  var resultArr = [], randNumber;
  while ( pCount > 0) {
      randNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (resultArr.indexOf(randNumber) == -1) {
          resultArr.push(randNumber);
          pCount--;
      }
}
//console.log(resultArr);
return resultArr;
}

/*In practice, we usually need to fetch data from a remote data source. 
Next.js comes with a standard API to fetch data for pages. 
We do it using an async function called getInitialProps.
With that, we can fetch data for a given page via a remote data source and pass it as props to our page. 
We can write our getInitialProps to work on both server and the client. So, Next.js can use it on both client and server.
In the code below, we are fetching five random Star Wars characters and passing them into our page as the 'randomCharacters' prop. */
Index.getInitialProps = async function() {
    const peopleURL = "https://swapi.co/api/people/"
    let randomCharacters = []
    const res = await fetch(peopleURL)
    let data = await res.json()  
    //console.log("**** data | first fetch ****")
    //console.log(data)
    const randomNumbers = generateRange(5, 0, data.count)

    for (const random of randomNumbers){
      const URL = `${peopleURL}${random}/?format=json`
      const res = await fetch(URL)
      let data = await res.json()
      data.id = random 
      randomCharacters.push(data)
    }
    
    console.log("**** randomCharacters ****")
    console.log(randomCharacters)
    
    
    /* const res = await fetch('https://swapi.co/api/people/')
    let data = await res.json()
    console.log("**** data ****")
    console.log(data)
    console.log("**** data.results.length ****")
    console.log(data.results.length)
    const randoms = generateRange(5, 0, data.results.length)
    const randomCharacters = data.results[randoms]
    console.log(randomCharacters) */


    //const res = await fetch('https://swapi.co/api/')
    //const data = await res.json()

    console.log(`Random characters fetched. Count: ${data.count} | Filtered Count: ${randomCharacters.length}`)

    let listItems = "<ul>";
    for (const random of randomCharacters){
      listItems += `<li key={random.id}>
      <Link as={/p/${random.id}} href={/post?id=${random.id}}>
        <a>${random.name}</a>
      </Link>
    </li>`
    }
    listItems += "</ul>"

    return {
      listItems: listItems
    }
}

export default Index