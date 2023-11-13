// apps/client/src/app/dashboard/accounts/page.tsx

// apps/client/src/app/(app-users)/settings/components/accounts-overview.tsx
import 'server-only';

import { getMyStripeAccounts } from '@/lib/data/me';
import { getSession } from '@auth0/nextjs-auth0';
import { Account } from '@shared/src';
import Link from 'next/link';

// export async function revalidateListings() {
//   'use server';
//   revalidatePath('/dashboard/accounts');
//   redirect('/dashboard/accounts');
// }

export default async function MyAccountsPage() {
  const session = await getSession();
  const user = session ? session.user : null;

  const res = await getMyStripeAccounts();
  const { appUser, stripeAccounts } = res.data;

  // console.log(stripeAccounts);

  if (stripeAccounts) {
    return (
      <>
        <h1>{user?.username} Listings</h1>
        <Link href={'/dashboard/'}>Back to Dashboard</Link>
        <TwTable stripeAccounts={stripeAccounts} />
      </>
    );
  } else {
    return <div>{user?.username}</div>;
  }
}

function AccountsHeader() {
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-white">
          Stripe Accounts
        </h1>
        <p className="mt-2 text-sm text-gray-300">
          A list of all the Stripe accounts in your account including their.
        </p>
      </div>
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <Link
          href="/dashboard/accounts/new"
          className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Add Stripe Account
        </Link>
      </div>
    </div>
  );
}

export function TwTable({ stripeAccounts }: { stripeAccounts: Account[] }) {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <AccountsHeader />

            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                        >
                          Account ID
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Charges Enabled
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Payouts/Transfers Enabled
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Onboarding Complete
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {stripeAccounts.map((account) => (
                        <tr key={account.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            {account.stripeAccountId}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {account.chargesEnabled.toString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {account.payoutsEnabled.toString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {account.detailsSubmitted ? (
                              account.detailsSubmitted.toString()
                            ) : (
                              <a
                                type="button"
                                // @ts-ignore
                                href={`${account.accountLink.url}`}
                                className="rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-white/20"
                              >
                                Finish Onboarding
                              </a>
                            )}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <Link
                              href={`/dashboard/accounts/edit/${account.id}`}
                              className="text-indigo-400 hover:text-indigo-300"
                            >
                              Edit
                              {/* <span className="sr-only">, {account.name}</span> */}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
