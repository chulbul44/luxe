"use client";

import Link from "next/link";
import { Settings2, Wrench } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
                <p className="text-sm text-gray-500">
                    Basic settings and maintenance actions for admin panel.
                </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <Settings2 className="w-5 h-5 text-gray-600" />
                    <p className="text-sm text-gray-700">
                        Panel is active and routes are configured.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Wrench className="w-5 h-5 text-gray-600" />
                    <p className="text-sm text-gray-700">
                        Need testing admin access quickly?
                    </p>
                </div>

                <Link
                    href="/admin/setup"
                    className="inline-flex items-center rounded-xl bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 transition-colors"
                >
                    Open Admin Setup
                </Link>
            </div>
        </div>
    );
}
