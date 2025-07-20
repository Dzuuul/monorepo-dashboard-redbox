import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

export function DatabaseTab() {
  return (
    <div className="grid gap-6 w-full px-2 sm:px-4 md:px-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Database Schema</CardTitle>
          <CardDescription>
            Struktur database dan relasi antar tabel.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold">Users Table</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>id</span>
                  <Badge variant="outline">UUID</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>username</span>
                  <Badge variant="outline">VARCHAR</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>email</span>
                  <Badge variant="outline">VARCHAR</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>role</span>
                  <Badge variant="outline">ENUM</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Entries Table</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>id</span>
                  <Badge variant="outline">UUID</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>title</span>
                  <Badge variant="outline">VARCHAR</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>status</span>
                  <Badge variant="outline">ENUM</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>created_at</span>
                  <Badge variant="outline">TIMESTAMP</Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Database Connection</h4>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm">
                {`// lib/database.ts
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default pool;`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
