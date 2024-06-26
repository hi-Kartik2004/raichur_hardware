/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/7r6DMqSWWHX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Arimo } from 'next/font/google'
import { Libre_Franklin } from 'next/font/google'

arimo({
  subsets: ['latin'],
  display: 'swap',
})

libre_franklin({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "@/components/ui/collapsible";
import globalData from "@/app/data";

export function FaqPage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-950">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h1>
            {/* <MessageCircleQuestionIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" /> */}
          </div>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Get answers to the most common questions about our product. If you
            can't find what you're looking for, feel free to{" "}
            <Link className="font-medium underline" href="/contact">
              contact us
            </Link>
            .
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {globalData?.faqs.map((faq) => (
            <Collapsible key={faq?.question}>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="flex items-center gap-3">
                  {faq?.icon}
                  <span>{faq?.question}</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="rounded-b-md border-x border-b border-gray-200 bg-white px-4 py-3 text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
                {faq?.answer}
              </CollapsibleContent>
            </Collapsible>
          ))}
          {/* <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span>How long does it take to set up your product?</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="rounded-b-md border-x border-b border-gray-200 bg-white px-4 py-3 text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
              The setup process is designed to be quick and easy. Most customers
              can get up and running in just a few minutes. We provide detailed
              onboarding guides and our support team is available to help you
              every step of the way.
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="flex items-center gap-3">
                <SettingsIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span>What kind of support do you offer?</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="rounded-b-md border-x border-b border-gray-200 bg-white px-4 py-3 text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
              We offer a range of support options, including email, phone, and
              live chat. Our knowledgeable support team is available 24/7 to
              assist you with any questions or issues you may have. We also
              provide a comprehensive knowledge base with step-by-step guides
              and troubleshooting tips.
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="flex items-center gap-3">
                <PlugIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span>Do you offer any integrations with other tools?</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="rounded-b-md border-x border-b border-gray-200 bg-white px-4 py-3 text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
              Yes, we offer a wide range of integrations with popular tools and
              platforms, including CRM, project management, and e-commerce
              software. This allows you to seamlessly connect our product with
              your existing workflows and data. You can find a full list of our
              integrations on our
              <Link className="font-medium underline" href="#">
                website
              </Link>
              or speak to our sales team for more information.
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="flex items-center gap-3">
                <LockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span>
                  What kind of security measures do you have in place?
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="rounded-b-md border-x border-b border-gray-200 bg-white px-4 py-3 text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
              We take security very seriously and have implemented a range of
              measures to protect your data, including end-to-end encryption,
              two-factor authentication, and regular security audits. Our
              infrastructure is also hosted on secure, highly available cloud
              platforms. You can find more details about our security practices
              in our
              <Link className="font-medium underline" href="#">
                trust and compliance documentation
              </Link>
              .
            </CollapsibleContent>
          </Collapsible> */}
        </div>
      </div>
    </section>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function MessageCircleQuestionIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function PlugIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
