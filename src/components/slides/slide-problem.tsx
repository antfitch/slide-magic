import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { XCircle, CheckCircle } from 'lucide-react';

export default function SlideProblem() {
  return (
    <div className="w-full text-center space-y-8">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
        Where It Goes Wrong: Poor Documentation
      </h2>
      <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
        When documentation is vague, incomplete, or poorly structured, AI models get confused. This leads to incorrect implementations, wasted time, and frustration.
      </p>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="border-destructive border-2 bg-destructive/5 text-left h-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <XCircle className="h-8 w-8 text-destructive" />
              <CardTitle className="text-destructive font-headline">Bad Documentation</CardTitle>
            </div>
            <CardDescription className="text-destructive/80">Vague, unstructured, and missing key details.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-md bg-muted text-left">
              <pre className="font-code text-sm text-foreground">
{`// Our API for user management
function manageUser(id, data) {
  // does stuff
}`}
              </pre>
            </div>
            <div className="mt-4 p-4 rounded-md bg-destructive/10 text-left">
              <p className="font-semibold text-destructive">AI's Interpretation:</p>
              <p className="text-sm font-code text-destructive-foreground/90">{`\`manageUser\` seems to be for user stuff. I'm not sure what \`data\` should be. I'll guess... I hope this doesn't delete the user.`}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary border-2 bg-primary/5 text-left h-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-primary" />
              <CardTitle className="text-primary font-headline">Good Documentation</CardTitle>
            </div>
            <CardDescription className="text-primary/80">Clear, structured, with types and examples.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-md bg-muted text-left">
              <pre className="font-code text-sm overflow-x-auto text-foreground">
{`/**
 * Updates a user's profile.
 * @param {string} id - The user's unique identifier.
 * @param {object} data - The user data to update.
 * @param {string} [data.name] - The user's new name.
 * @returns {Promise<User>} The updated user object.
 */
function updateUser(id, data) {
  // ... implementation
}`}
              </pre>
            </div>
            <div className="mt-4 p-4 rounded-md bg-primary/10 text-left">
              <p className="font-semibold text-primary">AI's Interpretation:</p>
              <p className="text-sm font-code text-primary/90">{`OK. To update a name, I'll call \`updateUser\` with the user ID and an object like \`{ name: "New Name" }\`. I know this returns a Promise.`}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
