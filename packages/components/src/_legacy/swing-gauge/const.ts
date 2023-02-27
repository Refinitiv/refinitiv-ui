enum Segment {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

enum TextType {
    LABEL = 'label',
    VALUE = 'value'
}

enum CenterLineStyle {
    SOLID = 'solid',
    DOTTED = 'dotted',
    DASHED = 'dashed'
}

enum DefaultStyle {
    PRIMARY_GAUGE_COLOR = '#2EB4C9',
    SECONDARY_GAUGE_COLOR = '#C93C4B',
    BOREDER_COLOR = '#000',
    CENTER_LINE_COLOR = '#949494',
    CENTER_LINE_STYLE = 'solid',
    CENTER_LINE_OPACITY = '0.6',
}
  
export { Segment, DefaultStyle, CenterLineStyle, TextType };
