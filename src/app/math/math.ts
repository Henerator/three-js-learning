export class MathHelper {
  static randomFloat(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }

  static randomSign(): number {
    return Math.random() > 0.5 ? 1.0 : -1.0;
  }

  static randomGaussian(mean = 0, stdev = 1): number {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    return z * stdev + mean;
  }

  static randomRadian(): number {
    return Math.random() * Math.PI * 2;
  }

  static degreeToRadian(degree: number): number {
    return (Math.PI / 180) * degree;
  }
}
