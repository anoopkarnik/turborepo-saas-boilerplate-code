import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/molecules/shadcn/card";
import UsersTable from "../../components/admin/UsersTable";

export default async function AdminDashboard() {
    return (
        <main className="flex flex-col">
            <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
                <div className="flex flex-col gap-2 mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-600">
                        Welcome to the admin dashboard. Here you can manage users and view system statistics.
                    </p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UsersTable/>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}