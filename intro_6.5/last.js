function cost(array_of_payments, living_cost) {
    if (Array.isArray(array_of_payments) && typeof living_cost === 'number') {
        let payments = 0;
        for (let i = 0; i < array_of_payments.length; i++) {
            if (array_of_payments[i] < 3000) {
                payments += array_of_payments[i];
            } else {
                let tmp = array_of_payments[i] - (array_of_payments[i] * 20) / 100;
                payments += tmp;
            }
        }

        if (payments - living_cost < 0) {
            console.log("Earn More", payments - living_cost);
        } else {
            console.log(payments - living_cost);
        }
    } else {
        console.log("Invalid Input");
    }
}

cost([1000, 2000, 3000], 5400);
