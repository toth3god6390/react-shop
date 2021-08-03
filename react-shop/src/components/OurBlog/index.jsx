import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { postsAPI } from '../../api'
import { MoreBtn } from '../UI/Buttons'
import Carousel from 'react-multi-carousel'
import { ButtonGroup } from '../MainSlider/Controls/BtnGroup'
import 'react-multi-carousel/lib/styles.css'
import s from './ourBlog.module.css'

export const OurBlog = () => {
	const [slides, setPosts] = useState([])
	const [btnShow, setBtnShow] = useState(false)
	const limit = 6

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await postsAPI.getPosts(limit)
				setPosts(data)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 3,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 3,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 3,
		},
	}

	const handleBtnGroupToggle = (e) => {
		e.type === 'mouseenter' ? setBtnShow(true) : setBtnShow(false)
	}

	return (
		<div className={s.section}>
			<div className='container'>
				<div className={s.block}>
					<h3 className={s.above__heading}>Our recent articles about Organic</h3>
					<h2 className={s.heading}>Our Blog Posts</h2>
				</div>
				<div className={s.slider} onMouseEnter={handleBtnGroupToggle} onMouseLeave={handleBtnGroupToggle}>
					<Carousel
						responsive={responsive}
						infinite={true}
						swipeable={false}
						draggable={false}
						customTransition='transform 250ms ease'
						containerClass={s.slider__container}
						itemClass={s.slide}
						arrows={false}
						renderButtonGroupOutside={true}
						onMouseEnter={handleBtnGroupToggle}
						onMouseLeave={handleBtnGroupToggle}
						customButtonGroup={<ButtonGroup active={btnShow} />}
					>
						{slides.map((slide) => {
							let { id, date, img, text, tags } = slide
							text = text.substr(0, 62) + '...'
							return (
								<div className={s.item} key={id}>
									<div className={s.content__wrapper}>
										<NavLink to='/shop'>
											<img alt='post' className={s.img} src={img} />
										</NavLink>
										<div className={s.body}>
											<div className={s.meta}>
												{date}{' '}
												{tags && (
													<div className={s.tags}>
														&nbsp;|&nbsp;
														{tags.map((tag, index) => (
															<NavLink to='/shop' key={index} className={s.tag}>
																{tag}{' '}
															</NavLink>
														))}
													</div>
												)}
											</div>
											<NavLink to='/shop' className={s.text}>
												{text}
											</NavLink>
											<MoreBtn to='/shop' />
										</div>
									</div>
								</div>
							)
						})}
					</Carousel>
				</div>
			</div>
		</div>
	)
}
