export interface Converter<TConvertSource, TConvertDestination> {
  convert(source: TConvertSource): TConvertDestination;
}
