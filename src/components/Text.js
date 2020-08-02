import React from 'react';

// This is specific to the sofia-pro typeface and should
// not be used for other typefaces.
export const CENTER_OFFSET = -0.1;

/**
 * The Text atom renders one or more lines of text. It is built to ensure
 * a few key things...
 * 1. Typeface-specific features like ascenders and descenders are never clipped (e.g. the
 *    bottom of a 'g' or 'y' character, or the top of '|').
 * 2. The consumer has tight control over the footprint of the text allowing
 *    fine-grained positioning. Features like whitespace and how it is distributed
 *    can be easily managed with minimal configuration.
 * 3. The footprint occupied by the text is not dependent on typeface-specific
 *    features like whitespace.
 *
 * While this atom works in all instances that require text to be rendered, the added boilerplate
 * here means it should be used most often in other atoms that require one or more lines of
 * text to be rendered.
 *
 * @param mixin A value from the CuMixins.Text object, used to style the text
 * @param ellipsize If greater than zero, ellipsize the text after so many lines
 * @param height The height of the box, in pixels, that will contain the text. This box will never clip characters
 * @param lineHeight The line-height of the text. This should generally be left at 1.5 to ensure the text
 *   itself has enough space to render without being clipped
 * @param offset The relative position of the text, in ems, within the containing box
 * @param trimWhitespaceTop The amount of whitespace, in ems, to remove from the top of the text node
 * @param trimWhitespaceBottom See above
 *
 * @example
 * // Renders two lines of ellipsized text stacked closely on top of one another
 * // without clipping any characters. The containing div will be 28px tall even though
 * // each text node is 21px tall.
 * <div>
 *   <Text mixin={ CuMixins.Text.Body } ellipsize={ 1 } height={ 14 }>This is the first line</Text>
 *   <Text mixin={ CuMixins.Text.Body } ellipsize={ 1 } height={ 14 }>This is the second line</Text>
 * </div>
 */
export const CustomizedText = ({
  height,
}) => {
  return (
    <StyledTextLine
      height={ height }
    >
      <StyledText
        lineHeight={ lineHeight }
      >
        { children }
      </StyledText>
    </StyledTextLine>
  );
};

const StyledTextLine = (({
  height,
}) => `
  ${height ? `
    height: ${height}px !important;
  ` : ''};
`);

const StyledText = (({
  lineHeight,
}) => `
  line-height: ${lineHeight} !important;
`);

export default CustomizedText;
