// Using a modified version of index.js from Example 2
// import Layout and Link
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
/*First of all we need to install isomorphic-unfetch. 
That's the library we are going to use to fetch data. 
It's a simple implementation of the browser fetch API, but works both in client and server environments. */
import fetch from 'isomorphic-unfetch'
import generateRange from '../components/helpers'

// Index is the function that is rendered
const Index = (props) => (
  <Layout>
    <h1>Star Wars API Demo - 5 Random Characters</h1>
    <ul>
      {/* loop through the props.randomCharacters array and output them. Give them links to the person detail page (details.js) */}
      {Array.from(props.randomCharacters).map(randomCharacter => (
        <li key={randomCharacter.id}>
          <Link as={`/person/${randomCharacter.id}`} href={`/details?id=${randomCharacter.id}&format=json`}>
            <a>{randomCharacter.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

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
    
    // doing randomNumbers in order to pull 5 random numbers within the count of characters because I didn't want to deal with pagination
    const randomNumbers = generateRange(5, 1, data.count)

    // loop through randomNumbers, set up the URL, fetch it to the data variable, add the character "id" to the data variable, and push the data variable to the randomCharacters array 
    for (const random of randomNumbers){
      const URL = `${peopleURL}${random}/?format=json`
      const res = await fetch(URL)
      let data = await res.json()
      data.id = random 
      randomCharacters.push(data)
    }

    // note about how many characters were found and how many after filtering using randomNumbers / randomCharacters
    console.log(`Random characters fetched. Count: ${data.count} | Filtered Count: ${randomCharacters.length}`)

    // return randomCharacters array to the Index function
    return {
      randomCharacters: randomCharacters
    }
}

export default Index