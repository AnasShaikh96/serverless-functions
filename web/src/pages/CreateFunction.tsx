import { Button } from '@/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/form'
import { Input } from '@/components/input'
import { createFunc } from '@/lib/api'
import { createFunctionSchema } from '@/lib/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import {  useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const formSchema = createFunctionSchema;

const CreateFunction = () => {
  const router = useRouter()
  const user = localStorage.getItem('user')


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fn_name: '',
      owner: user ?? '',
      runtime: '',
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await createFunc(values);

      toast.success(res.message || 'Function created successfully')
      router.navigate({
        href: `/function/${res.data.id}`,
        replace: true
      })
    } catch (error) {
      toast.error(error?.message || 'Failed to create function')
    }
  }


  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Create Function</CardTitle>
              <CardDescription>
                Create function with name and runtime.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="fn_name"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel htmlFor="fn_name">Email</FormLabel>
                          <FormControl>
                            <Input
                              id="fn_name"
                              placeholder="index.js"
                              type="fn_name"
                              autoComplete="fn_name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="runtime"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel htmlFor="runtime">Runtime</FormLabel>
                          <FormControl>
                            <Input
                              id="runtime"
                              placeholder="Node 18.0"
                              type="runtime"
                              autoComplete="runtime"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? 'Creating Function' : 'Create Function'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

  )
}

export default CreateFunction