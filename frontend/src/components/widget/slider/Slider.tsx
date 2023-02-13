import './Slider.css';

type sliderProps = {
    size: string,
    title: string
}

const Slider = ({size, title}: sliderProps) => {
    return (
        <>
            <h2>{title}</h2>
            <div className="slider">
                <div className="slider__inner" style={{width: size }}></div>
            </div>
        </>
    )
}

export default Slider;