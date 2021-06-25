export type StandardEvent<T=string> = CustomEvent<{
    value: T
}>;
