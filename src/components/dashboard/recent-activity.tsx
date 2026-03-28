import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "@/lib/types";

export function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>Live updates across campaigns and creator conversations.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="rounded-xl border border-slate-200 p-3 dark:border-slate-800"
          >
            <p className="text-sm font-medium">{activity.action}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{activity.detail}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {new Date(activity.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
        <Separator />
        <p className="text-xs text-slate-500 dark:text-slate-400">
          No automated social posting events are tracked in this version.
        </p>
      </CardContent>
    </Card>
  );
}
