import Link from "next/link";
import { Boxes, ClipboardCheck, PlusCircle } from "lucide-react";

const adminActions = [
  {
    title: "Add Grocery",
    description: "Create a new grocery item with category, unit, price, and image.",
    href: "/admin/add-grocery",
    icon: PlusCircle,
  },
  {
    title: "View Groceries",
    description: "Review listed products and keep inventory details up to date.",
    href: "#",
    icon: Boxes,
  },
  {
    title: "Manage Orders",
    description: "Check customer orders and delivery progress from one place.",
    href: "#",
    icon: ClipboardCheck,
  },
];

export default function AdminPanelActions() {
  return (
    <section className="bg-slate-50 pt-32">
      <div className="mx-auto w-[92%] max-w-7xl">
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Admin panel
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950 md:text-4xl">
            Manage SnapCart
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {adminActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700 transition group-hover:bg-green-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-950">
                  {action.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
