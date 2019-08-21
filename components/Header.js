import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const randomNumberHead = (Math.floor(Math.random() * (87 - 1)) + 1)
const headerlink = `/person/${randomNumberHead}`

const Header = () => (
    <div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link as={headerlink} href={`/details?id=${randomNumberHead}&format=json`}>
          <a style={linkStyle}>Details for a Random Character</a>
        </Link>
    </div>
)

export default Header
