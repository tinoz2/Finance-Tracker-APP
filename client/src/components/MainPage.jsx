import img from '/homeImage.png'
import { Button } from "./ui/button"
import { ChevronRight } from "lucide-react"
import perfil from '/perfil.png'
import arrow from '/arrow.svg'
import { Link } from "react-router-dom"

const MainPage = () => {

    const background = '#C8A1E0'
    const border = '0.2rem'
    const cursor = 'pointer'

    const cards = [
        {
            title: '1M+',
            img: perfil,
            color: background
        },
        {
            title: '5TB+',
            img: perfil,
            color: background
        },
        {
            title: '6M+',
            img: perfil,
            color: background
        },
        {
            title: 'Demo',
            img: arrow,
            border: border,
            span: 'Request free',
            cursor,
            link: '/register'
        }
    ]

    return (
        <main className="m-4">
            <div className="bg-main rounded-mainRounded p-2">
                <div className="flex items-center my-16">
                    <div className="flex justify-evenly items-center">
                        <div className="w-1/3">
                            <h2 className="text-6xl font-semibold leading-snug mb-4">Plan, save, and enjoy: finances at your fingertips !</h2>
                            <p className="font-medium">ake control of your financial journey with FinanceTrackerApp—where budgeting meets simplicity, allowing you to plan, save, and invest with confidence for a brighter future.</p>
                            <Button className="mt-12 text-lg p-6" variant="outline"><Link to='/register'>Get started </Link><ChevronRight className="ml-4" /></Button>
                        </div>
                        <aside>
                            <img src={img} alt="" />
                        </aside>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 space-x-6">
                {
                    cards.map((card, i) => (
                        card.link ? <Link to={card.link} key={i}>
                            <div style={{ backgroundColor: card.color, borderWidth: card.border, borderColor: 'black', cursor: card.cursor }} className="mt-6 rounded-mainRounded p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium">{card.span}</span>
                                        <span className="text-4xl font-semibold my-2">{card.title}</span>
                                    </div>
                                    <img src={card.img} className="w-20" alt="" />
                                </div>
                            </div></Link>
                            :
                            <div style={{ backgroundColor: card.color, borderWidth: card.border, borderColor: 'black', cursor: card.cursor }} className="mt-6 rounded-mainRounded p-6" key={i}>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium">{card.span}</span>
                                        <span className="text-4xl font-semibold my-2">{card.title}</span>
                                    </div>
                                    <img src={card.img} className="w-20" alt="" />
                                </div>
                            </div>
                    ))
                }
            </div>
        </main>
    )
}

export default MainPage