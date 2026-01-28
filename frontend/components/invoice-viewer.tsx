import { forwardRef } from "react";

const InvoiceViewer = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{ backgroundColor: "#ffffff" }}
      className="w-[800px] text-sm p-8 border font-sans"
    >
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h2 style={{ color: "#000000" }} className="font-bold text-lg">
            Zylker Electronics Hub
          </h2>
          <p>14B, Northern Street</p>
          <p>Greater South Avenue</p>
          <p>New York New York 10001</p>
          <p>U.S.A</p>
        </div>

        <h1
          style={{ color: "rgb(29, 78, 216)" }}
          className="text-4xl font-bold"
        >
          INVOICE
        </h1>
      </div>

      {/* INVOICE INFO */}
      <div className="grid grid-cols-2 border mb-6">
        <div className="p-3 border-r space-y-1">
          <p>
            <b>Invoice#</b> : INV-000001
          </p>
          <p>
            <b>Invoice Date</b> : 05 Aug 2024
          </p>
          <p>
            <b>Terms</b> : Due on Receipt
          </p>
          <p>
            <b>Due Date</b> : 05 Aug 2024
          </p>
        </div>
        <div />
      </div>

      {/* BILL TO / SHIP TO */}
      <div className="grid grid-cols-2 border mb-6">
        <div className="p-3 border-r">
          <p className="font-semibold mb-2">Bill To</p>
          <p className="font-bold">Ms. Mary D. Dunton</p>
          <p>1324 Hinkle Lake Road</p>
          <p>Needham</p>
          <p>02192 Maine</p>
        </div>

        <div className="p-3">
          <p className="font-semibold mb-2">Ship To</p>
          <p>1324 Hinkle Lake Road</p>
          <p>Needham</p>
          <p>02192 Maine</p>
        </div>
      </div>

      {/* TABLE */}
      <table style={{ borderCollapse: "collapse" }} className="w-full mb-6">
        <thead style={{ backgroundColor: "rgb(29, 78, 216)", color: "#ffffff" }}>
          <tr>
            <th style={{ border: "1px solid #000", padding: "8px", width: "40px" }}>#</th>
            <th style={{ border: "1px solid #000", padding: "8px", textAlign: "left" }}>Item & Description</th>
            <th style={{ border: "1px solid #000", padding: "8px", width: "64px", textAlign: "center" }}>Qty</th>
            <th style={{ border: "1px solid #000", padding: "8px", width: "96px", textAlign: "right" }}>Rate</th>
            <th style={{ border: "1px solid #000", padding: "8px", width: "96px", textAlign: "right" }}>Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>1</td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              <b>Camera</b>
              <p style={{ color: "#6B7280" }}>DSLR camera with advanced shooting capabilities</p>
            </td>
            <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>1.00</td>
            <td style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>$899.00</td>
            <td style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>$899.00</td>
          </tr>

          <tr>
            <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>2</td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              <b>Fitness Tracker</b>
              <p style={{ color: "#6B7280" }}>Activity tracker with heart rate monitoring</p>
            </td>
            <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>1.00</td>
            <td style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>$129.00</td>
            <td style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>$129.00</td>
          </tr>

          <tr>
            <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>3</td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              <b>Laptop</b>
              <p style={{ color: "#6B7280" }}>Lightweight laptop with a powerful processor</p>
            </td>
            <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>1.00</td>
            <td style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>$1,199.00</td>
            <td style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>$1,199.00</td>
          </tr>
        </tbody>
      </table>

      {/* FOOTER */}
      <div className="flex justify-between">
        <div style={{ color: "#6B7280" }}>
          <p>Thanks for shopping with us.</p>

          <p className="mt-4 font-semibold">Terms & Conditions</p>
          <p>
            Full payment is due upon receipt of this invoice.
            Late payments may incur additional charges or
            interest as per the applicable laws.
          </p>
        </div>

        <div style={{ backgroundColor: "rgb(219,234,254)" }} className="w-64 p-4 space-y-2">
          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>$2,227.00</span>
          </div>
          <div className="flex justify-between">
            <span>Tax Rate</span>
            <span>5.00%</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>$2,338.35</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Balance Due</span>
            <span>$2,338.35</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default InvoiceViewer;
