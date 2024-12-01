import { Dispatch, SetStateAction, } from 'react'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, SearchIcon } from 'lucide-react';

const formSchema = z.object({
    query: z.string().min(0).max(200),
  });

export function SearchBar({query, setQuery}: {query: string, setQuery: Dispatch<SetStateAction<string>>}) {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
        defaultValues: {
            query: "",
        },
    });

      async function onSubmit(values: z.infer<typeof formSchema>) {
        setQuery(values.query);
      }

  return (
      <div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 items-center">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} 
                  placeholder='Search file names'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit"
            disabled={form.formState.isSubmitting}
            className="flex gap-2"
          >
          {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin"/>}
          <SearchIcon /> Search
          </Button>
        </form>
        </Form>
      </div>  
  );
}