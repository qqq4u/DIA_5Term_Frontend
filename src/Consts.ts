import {Parking} from "./Types";

export const requestTime = 1000


export const iParkingsMock: Parking[] = [
    {
        id: 1,
        name: "Парковка возле главного здания",
        status: 1,
        address: "2-я Бауманская ул., 5, стр. 4, Москва",
        image: "",
        places_count: 1
    },
    {
        id: 2,
        name: "Парковка возле лефортовского тоннеля",
        status: 1,
        address: "Кондрашёвский тупик, 3А, Москва",
        image: "",
        places_count: 2
    },
    {
        id: 3,
        name: "Парковка возле корпуса Энергомашиностроения",
        status: 1,
        address: "Бригадирский пер., 3-5, Москва\n",
        image: "",
        places_count: 3
    },
    {
        id: 4,
        name: "Парковка возле УЛК",
        status: 1,
        address: "Рубцовская набережная, 2/18, Москва",
        image: "",
        places_count: 4
    }
]