export class MathHelper {
  static randomFloat(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }

  static randomSign(): number {
    return Math.random() > 0.5 ? 1.0 : -1.0;
  }
}
