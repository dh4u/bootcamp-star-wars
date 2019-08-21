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
        <Link href={headerlink}>
          <a style={linkStyle}>Character Details</a>
        </Link>
    </div>
)

export default Header
