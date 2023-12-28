//<T> generic type
//this function allows any types to pass in and check if the type is nonnullable (undefined or null)
export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    if (!val) {
        throw Error("Expected 'val' to be defined by received" + val);
    }
}