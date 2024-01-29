export default function date(_: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { date: string; }): void; new(): any; }; }; }) {
    const currentDate = new Date();
    res.status(200).json({ date: currentDate.toLocaleDateString() });
  }
  