import { atom } from "jotai";
const abc = [atom("message")];

const codeText = `const abc = [atom("message")];`;

export function StrangeAssignment() {
  return (
    <div>
      <pre>{codeText}</pre>
      <pre>typeof abc: {typeof abc}</pre>
      <pre>JSON.stringify(abc): {JSON.stringify(abc, undefined, 2)}</pre>
    </div>
  );
}
