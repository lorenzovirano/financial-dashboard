import './Charts.css'
import DoughnutChart from "./doughnutChart/DoughnutChart";
import LineChart from "./lineChart/LineChart";
import { IonSlides, IonSlide } from "@ionic/react"


type chartsProps = {
    data: any;
}

const Charts = ({ data }: chartsProps) => {
    console.log(data)
    return (
        <IonSlides pager={true} mode="ios">
            <IonSlide>
                <DoughnutChart label={data.resultLabel} cash={data.resultCash} title="Uscite" total={data.total} />
            </IonSlide>
            <IonSlide>
                <LineChart title="Entrate" />
            </IonSlide>
        </IonSlides>
    )
}

export default Charts;