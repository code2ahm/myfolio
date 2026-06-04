declare module "gsap-trial/SplitText" {
  export class SplitText {
    chars: Element[];
    lines: Element[];
    words: Element[];

    constructor(
      target: string | Element | Array<string | Element>,
      vars?: Record<string, unknown>
    );

    revert(): void;
  }
}
