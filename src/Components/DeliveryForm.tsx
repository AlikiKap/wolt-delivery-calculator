type deliveryData = {
    cartValue: string
    deliveryDistance: string
    itemsAmount: string
    time: string

}

type deliveryFormProps = deliveryData & {
    updateFields: (fields: Partial<deliveryData>) => void
}

export function DeliveryForm({
    cartValue, deliveryDistance, itemsAmount, time, updateFields
}: deliveryFormProps) {
    let surcharge = 0
    let deliveryFee = 0

    function Calculate(cartValue: string, deliveryDistance: string, itemsAmount: string, time: string) {

        let cartValueNum = +cartValue
        let deliveryDistanceNum = +deliveryDistance
        let itemsAmountNum = +itemsAmount
        let timeDate = new Date(time);


        if (cartValueNum < 10) {
            surcharge = surcharge + (10 - cartValueNum)
        }

        if (deliveryDistanceNum <= 1000) {
            surcharge += 2
        }
        else if (deliveryDistanceNum > 1000) {
            surcharge += 2;
            deliveryDistanceNum -= 1000;
        
            while (deliveryDistanceNum > 0) {
                surcharge += 1;
                deliveryDistanceNum -= 500;
            }
                console.log(surcharge)
            
        }
        if (itemsAmountNum >= 12) {
            surcharge += 0.50 * itemsAmountNum + 1.20

        }
        else if (itemsAmountNum >= 5) {
            surcharge += 0.50 * itemsAmountNum
        }
        if (
            (timeDate.getDay() === 5)
            && (timeDate.getHours() < 19 && timeDate.getHours() > 17)
        ) {
            surcharge = surcharge * 1.2
        }
        else if (cartValueNum >= 100) {
            surcharge = 0
        }
        if (deliveryFee > 15) {
            deliveryFee = 15
        }



        deliveryFee += surcharge
        console.log(deliveryFee)
        return (deliveryFee.toFixed(2))
    }

    return (
        <div className="App">
            <div className="form-container">
                <form
                    className="rows-container"
                >
                    <h1>Delivery Fee Calculator</h1>
                    <div className='input-row-container'>
                        <div>Cart value</div>
                        <input
                            className="inputs"
                            placeholder="&#8364;"
                            autoFocus
                            required
                            type="text"
                            value={cartValue}
                            onChange={e => updateFields({ cartValue: e.target.value })}
                        />

                    </div>
                    <div className='input-row-container'>
                        <div>Delivery distance</div>
                        <input
                            placeholder="m"
                            className="inputs"
                            required
                            type="text"
                            value={deliveryDistance}
                            onChange={e => updateFields({ deliveryDistance: e.target.value })}
                        />
                    </div>
                    <div className='input-row-container'>
                        <div>Amount of items</div>
                        <input
                            className="inputs"
                            required
                            type="text"
                            value={itemsAmount}
                            onChange={e => updateFields({ itemsAmount: e.target.value })}
                        />

                    </div>
                    <div className='input-row-container'>
                        <div>time</div>
                        <input className="inputs"
                            required
                            type="datetime-local"
                            value={time}
                            onChange={e => updateFields({ time: e.target.value })}
                        />
                    </div>
                    <button type="submit" >Calculate delivery price</button>
                    <div>Delivery price: {Calculate(cartValue, deliveryDistance, itemsAmount, time)} &#8364;</div>
                </form>
            </div>
        </div>
    )
}