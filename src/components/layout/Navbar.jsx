import { Search, Grid3X3, Bell, User } from 'lucide-react'
import logoImg from '../../assets/images/Film Tarsnak Logo.png'

const NavLink = ({ children, href = '#' }) => (
  <a href={href}>{children}</a>
)

const IconBtn = ({ children }) => (
  <button className="icon-btn">
    {children}
  </button>
)

const Navbar = () => {
  return (
    <nav className="navbar" dir="rtl">
      <div className="navbar-container">
        {/* Left: logo */}
        <div className="logo">
          <img src={logoImg} alt="Film Tarsnak" />
        </div>

        {/* Center: menu */}
        <nav className="menu">
          <NavLink>دسته بندی ها</NavLink>
          <NavLink>فیلم</NavLink>
          <NavLink>سریال</NavLink>
          <NavLink>بازیگران</NavLink>
          <NavLink>جدید ترین دوبله ها</NavLink>
        </nav>

        {/* Right: icons (kept LTR order) */}
        <div className="icons" dir="ltr">
          <IconBtn>
            <User size={20} />
          </IconBtn>
          <IconBtn>
            <Search size={20} />
          </IconBtn>
          <IconBtn>
            <Grid3X3 size={20} />
          </IconBtn>
          <IconBtn>
            <Bell size={20} />
          </IconBtn>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
