import './Charts.css'
import DoughnutChart from "./doughnutChart/DoughnutChart";
import LineChart from "./lineChart/LineChart";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFlip } from 'swiper';

type chartsProps = {
    data: any;
}

const Charts = ({ data }: chartsProps) => {
    console.log(data)
    return (
        <Swiper
        spaceBetween={25}
        slidesPerView={1}
        modules={[ Pagination, EffectFlip ]}
        pagination={{ clickable: true }}
        effect="flip"
        >
            <SwiperSlide>
                <div className="chart">
                    <DoughnutChart label={data.resultLabel} cash={data.resultCash} title="Uscite" total={data.total} />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="chart">
                    <LineChart title="Entrate" />
                </div>
            </SwiperSlide>
        </Swiper>
    )
}

export default Charts;