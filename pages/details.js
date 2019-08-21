// Using a modified version of post.js from Example 2
// import Layout and Link
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
/*First of all we need to install isomorphic-unfetch. 
That's the library we are going to use to fetch data. 
It's a simple implementation of the browser fetch API, but works both in client and server environments. */
import fetch from 'isomorphic-unfetch'

// Index is the function that is rendered. Output the props.data values that we are interested in
const Index = (props) => (
  <Layout>
    {console.log("****** props *********")}
    {console.log(props)}
    <h1>Star Wars API Demo - {props.data.name}</h1>
    <div className="container column" style={{width:'90%', textAlign: "center"}}>
    
        <div className="container row">
            <div className="col-4" style={{textAlign: "right"}}>
                <strong>Name:</strong>
            </div>
            <div className="col-8" style={{textAlign: "left"}}>  
                &nbsp;{props.data.name}
            </div>
        </div>
        <div className="container row">
            <div className="col-4" style={{textAlign: "right"}}>
                <strong>Species:</strong>
            </div>
            <div className="col-8" style={{textAlign: "left"}}>  
                <a href={props.data.species} target="_blank">&nbsp;{(props.data.speciesDetail.name)}</a>
            </div>
        </div>
        <div className="container row">
            <div className="col-4" style={{textAlign: "right"}}>
                <strong>Gender:</strong>
            </div>
            <div className="col-8" style={{textAlign: "left"}}>  
                &nbsp;{props.data.gender}
            </div>
        </div>
        <div className="container row">
            <div className="col-4" style={{textAlign: "right"}}>
                <strong>Home Planet:</strong>
            </div>
            <div className="col-8" style={{textAlign: "left"}}>  
                <a href={props.data.homeworld} target="_blank">&nbsp;{(props.data.homeworldDetail.name)}</a>
            </div>
        </div>
        <div className="container row">
            <div className="col-4" style={{textAlign: "right"}}>
                <strong>Films:</strong>
            </div>
            <div className="col-8" style={{textAlign: "left"}}>
                <br />
                <h6>In Release Order</h6><hr />
                {
                // films is an array that must be iterated over and this took goddamn forever to figure out. this is based on http://www.justthink.it/articles/react-loop-inside-jsx-code/    
                // show the movies in release order by comparing the release_date values in the array
                    function(){
                        let rows = [];

                        function compare(a, b) {
                            // Use toUpperCase() to ignore character casing
                            const episodeA = a.release_date;
                            const episodeB = b.release_date;

                            let comparison = 0;
                            if (episodeA < episodeB) {
                                comparison = 1;
                            } else if (episodeA > episodeB) {
                                comparison = -1;
                            }
                            //console.log("comparison result")
                            //console.log("episodeA: " + episodeA)
                            //console.log("episodeB: " + episodeB)
                            //console.log(comparison)
                            //return comparison; // descending order
                            return comparison * -1 //ascending order
                        }

                        let filmDetails =  props.data.filmDetails.sort(compare)

                        filmDetails.forEach(film => {
                            //console.log("###### film ########")
                            //console.log(film)
                            rows.push(<>&nbsp;<a href={film.url} target="_blank">Episode {film.episode_id} - {film.title}</a><br /></>)
                        });
                        return rows
                    }()

                }

                <br />
                <h6>In Episode Order</h6><hr />
                {
                // films is an array that must be iterated over and this took goddamn forever to figure out. this is based on http://www.justthink.it/articles/react-loop-inside-jsx-code/     
                // show the movies in episode order by comparing the episode_id values in the array  
                    function(){
                        let rows = [];

                        function compare(a, b) {
                            const episodeA = a.episode_id;
                            const episodeB = b.episode_id;

                            let comparison = 0;
                            if (episodeA < episodeB) {
                                comparison = 1;
                            } else if (episodeA > episodeB) {
                                comparison = -1;
                            }
                            //console.log("comparison result")
                            //console.log("episodeA: " + episodeA)
                            //console.log("episodeB: " + episodeB)
                            //console.log(comparison)
                            //return comparison; // descending order
                            return comparison * -1 // ascending order
                        }

                        let filmDetails =  props.data.filmDetails.sort(compare)

                        filmDetails.forEach(film => {
                            rows.push(<>&nbsp;<a href={film.url} target="_blank">Episode {film.episode_id} - {film.title}</a><br /></>)
                        });
                        return rows
                    }()

                }
            </div>
        </div>
    </div>
  </Layout>
)

/*In practice, we usually need to fetch data from a remote data source. 
Next.js comes with a standard API to fetch data for pages. 
We do it using an async function called getInitialProps.
With that, we can fetch data for a given page via a remote data source and pass it as props to our page. 
We can write our getInitialProps to work on both server and the client. So, Next.js can use it on both client and server.
In the code below, we are fetching five random Star Wars characters and passing them into our page as the 'randomCharacters' prop. */
Index.getInitialProps = async ({ req }) => {
    // get the person detail. the data variable will be used as the "base" and we will add more detail to it
    const res = await fetch(`https://swapi.co/api/people/${req.params.id}?format=json`)
    let data = await res.json() 
    
    //console.log("**** randomCharacter ****")
    //console.log(data)

    // get the character's species and add that to the data variable
    let species = await fetch(data.species[0])
    species = await species.json()
    data.speciesDetail = species
    //console.log("**** species ****")
    //console.log(data.speciesDetail)

    // get detail about the films the character is in and add that to the data variable
    let films = []
    for (const film of data.films){
        const thisFilm = await fetch(film)
        thisFilm = await thisFilm.json()
        //console.log("*********** film ******************")
        //console.log(thisFilm)
        films.push(thisFilm)
    }
    data.filmDetails = films;
    //console.log("**** films ****")
    //console.log(data.filmDetails)

    // get the character's homeworld and add that to the data variable
    let homeworld = await fetch(data.homeworld)
    homeworld = await homeworld.json()
    //console.log("**** homeworld ****")
    //console.log(homeworld) 
    data.homeworldDetail = homeworld

    // pass the data variable to the Index function
    return {
        data: data
    }
}

export default Index