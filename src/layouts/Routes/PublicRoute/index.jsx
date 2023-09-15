import PublicAppShell from '@/layouts/AppShells/PublicAppShell';
import { Outlet } from 'react-router-dom';

function PublicRoute() {
  return (
    <PublicAppShell>
      <Outlet />
    </PublicAppShell>
  );
}

export default PublicRoute;
