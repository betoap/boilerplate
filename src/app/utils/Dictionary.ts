export class Dictionary<TKey, TValue> extends Map<TKey, TValue> {

    constructor(entries?: ReadonlyArray<[TKey, TValue]> | null) {
        super(entries);
    }

    public getForValue( _value: TValue ): [TKey, TValue] | undefined {
        for ( const item of this ) {
            if( item[1] === _value ) {
                return item;
            }
        }
        return undefined;
    }
}
