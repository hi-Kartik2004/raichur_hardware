"use client";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const ContactUsTableV0 = () => {
  const [queries, setQueries] = useState([]);
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [filter, setFilter] = useState("all");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "queries"));
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        status: doc.data().status || "Pending",
      }));
      setQueries(data);
      setFilteredQueries(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredQueries(
      queries.filter((query) => {
        if (filter === "all") return true;
        return filter === "resolved"
          ? query.status === "Resolved"
          : query.status === "Pending";
      })
    );
  }, [filter, queries]);

  const handleResolve = async (id) => {
    const queryDoc = doc(db, "queries", id);
    await updateDoc(queryDoc, { status: "Resolved" });
    setQueries(
      queries.map((query) =>
        query.id === id ? { ...query, status: "Resolved" } : query
      )
    );
  };

  const handleDelete = async (id) => {
    const queryDoc = doc(db, "queries", id);
    await deleteDoc(queryDoc);
    setQueries(queries.filter((query) => query.id !== id));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleDialogOpen = (query) => {
    setSelectedQuery(query);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedQuery(null);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQueries = filteredQueries.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contact Us Queries</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleFilterChange("all")}>
            All
          </Button>
          <Button
            variant="outline"
            onClick={() => handleFilterChange("resolved")}
          >
            Resolved
          </Button>
          <Button
            variant="outline"
            onClick={() => handleFilterChange("pending")}
          >
            Pending
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Phone</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedQueries.map((query) => (
              <TableRow key={query?.id}>
                <TableCell>
                  <Link href={`tel:${query?.email}`}>{query?.email}</Link>
                </TableCell>
                <TableCell>{query?.name}</TableCell>
                <TableCell>{query?.subject}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"secondary"}>Message</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <h3 className="text-lg font-semibold">Message</h3>
                      <p>{query?.message}</p>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  {query?.timestamp
                    ? new Date(query?.timestamp?.seconds * 1000).toLocaleString(
                        "en-IN"
                      )
                    : "Could not get"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      query.status === "Resolved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                    variant="outline"
                  >
                    {query?.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleResolve(query.id)}
                    >
                      Resolve
                    </Button>
                    <Button
                      color="red"
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(query.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-center">
        {Array(Math.ceil(filteredQueries.length / itemsPerPage))
          .fill()
          .map((_, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default ContactUsTableV0;
