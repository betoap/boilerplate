export class Dictionary<TKey, TValue> extends Map<TKey, TValue> {

    constructor(entries?: ReadonlyArray<[TKey, TValue]> | null) {
        super(entries);
    }

    getForValue( _value: TValue ) {
        for ( const item of this ) {
            if( item[1] === _value ) {
                return item;
            }
        }
    }
}


// let e = new Dictionary();
// e.set('x', 1);
// e.set('y', 2);
// e.set('z', 3);
// console.log(
//     e.get('a'),
//     e.getForValue(4)
// );


